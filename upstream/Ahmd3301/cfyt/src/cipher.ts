export interface CipherSpec {
  operations: CipherOp[];
}

type CipherOp =
  | { type: "reverse" }
  | { type: "splice"; n: number }
  | { type: "slice";  n: number }
  | { type: "swap";   n: number };

const REVERSE_RE = /\.reverse\(\)/;
const SPLICE_RE  = /\.splice\(0,\s*(\d+)\)/;
const SLICE_RE   = /\.slice\((\d+)\)/;
const SWAP_RE    = /var\s+\w+\s*=\s*\w+\[(\d+)\]\s*;\s*\w+\[\d+\]\s*=\s*\w+\[\d+\]\s*;\s*\w+\[\d+\]\s*=\s*\w+/;

export function extractCipherSpec(code: string): CipherSpec | null {
  const ops: CipherOp[] = [];
  if (REVERSE_RE.test(code)) ops.push({ type: "reverse" });
  const spliceM = code.match(SPLICE_RE);
  if (spliceM) ops.push({ type: "splice", n: parseInt(spliceM[1], 10) });
  const sliceM = code.match(SLICE_RE);
  if (sliceM) ops.push({ type: "slice", n: parseInt(sliceM[1], 10) });
  const swapM = code.match(SWAP_RE);
  if (swapM) ops.push({ type: "swap", n: parseInt(swapM[1], 10) });
  return ops.length > 0 ? { operations: ops } : null;
}

export function applyCipherSpec(s: string, spec: CipherSpec): string {
  let arr = [...s];
  for (const op of spec.operations) {
    switch (op.type) {
      case "reverse": arr = arr.reverse(); break;
      case "splice":  arr = arr.slice(op.n); break;
      case "slice":   arr = arr.slice(op.n); break;
      case "swap":
        if (op.n < arr.length) { const t = arr[0]; arr[0] = arr[op.n]; arr[op.n] = t; }
        break;
    }
  }
  return arr.join("");
}

export function findDecipherFunc(playerJs: string): { code: string; sts: number } | null {
  const stsM = playerJs.match(/signatureTimestamp\s*:\s*(\d+)/);
  const sts   = stsM ? parseInt(stsM[1], 10) : 0;

  const m1 = playerJs.match(/\.sig\s*=\s*function\((\w)\)\s*\{([^}]+)\}/);
  if (m1) return { code: m1[2], sts };

  const sigRef = playerJs.match(/(\w+)\.sig\s*\|\|\s*(\w+)/);
  if (sigRef) {
    const fn = sigRef[2];
    const m2 = playerJs.match(new RegExp(`${fn}\\s*=\\s*function\\s*\\(\\s*(\\w+)\\s*\\)\\s*\\{([^}]+)\\}`, "i"));
    if (m2) return { code: m2[2], sts };
  }

  const m3 = playerJs.match(/function\s+([\w$]+)\s*\(\s*\w+\s*\)\s*\{([^}]*\.reverse\(\)[^}]*)\}/);
  if (m3) return { code: m3[2], sts };

  return null;
}

export function solveNTransform(nValue: string, playerJs?: string): string {
  if (!playerJs) return nValue;
  const nFuncM = playerJs.match(/function\s+([\w$]+)\s*\(\s*n\s*\)\s*\{([^}]+)\}/);
  if (!nFuncM) return nValue;
  const code = nFuncM[2];
  const ops: CipherOp[] = [];
  if (/\.reverse\(\)/.test(code)) ops.push({ type: "reverse" });
  const sliceM = code.match(/\.slice\((\d+)\)/);
  if (sliceM) ops.push({ type: "slice", n: parseInt(sliceM[1], 10) });
  const spliceM = code.match(/\.splice\(0,\s*(\d+)\)/);
  if (spliceM) ops.push({ type: "splice", n: parseInt(spliceM[1], 10) });
  if (ops.length === 0) return nValue;
  return applyCipherSpec(nValue, { operations: ops });
}

export function decodeUrl(cipher: string): { url: string; sp: string; s: string } | null {
  const p   = new URLSearchParams(cipher);
  const url = p.get("url");
  const sp  = p.get("sp") ?? "signature";
  const s   = p.get("s");
  if (!url) return null;
  return { url, sp, s: s ?? "" };
}
