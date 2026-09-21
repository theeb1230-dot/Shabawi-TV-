export interface CipherSpec {
  operations: CipherOp[];
}

type CipherOp =
  | { type: "reverse" }
  | { type: "splice"; n: number }
  | { type: "slice"; n: number }
  | { type: "swap"; n: number };

const REVERSE_RE = /\.reverse\(\)/;
const SPLICE_RE = /\.splice\(0,\s*(\d+)\)/;
const SLICE_RE = /\.slice\((\d+)\)/;
const SWAP_RE = /var\s+\w+\s*=\s*\w+\[(\d+)\]\s*;\s*\w+\[\d+\]\s*=\s*\w+\[\d+\]\s*;\s*\w+\[\d+\]\s*=\s*\w+/;
const SIG_FUNC_RE = /function\s+(?:[\w$]+)\s*\(\s*(\w+)\s*\)\s*\{([^}]+)\}/g;
const SIG_FUNC_ASSIGN_RE = /(?:[\w$]+)\s*=\s*function\s*\(\s*(\w+)\s*\)\s*\{([^}]+)\}/g;
const SIG_OBJECT_RE = /([\w$]+)\s*:\s*function\s*\(\s*(\w+)\s*\)\s*\{([^}]+)\}/g;

let playerCache = new Map<string, { spec: CipherSpec; sts: number }>();

export function clearCache() {
  playerCache.clear();
}

export function extractCipherSpec(code: string): CipherSpec | null {
  const ops: CipherOp[] = [];

  if (REVERSE_RE.test(code)) ops.push({ type: "reverse" });
  const spliceMatch = code.match(SPLICE_RE);
  if (spliceMatch) ops.push({ type: "splice", n: parseInt(spliceMatch[1], 10) });
  const sliceMatch = code.match(SLICE_RE);
  if (sliceMatch) ops.push({ type: "slice", n: parseInt(sliceMatch[1], 10) });
  const swapMatch = code.match(SWAP_RE);
  if (swapMatch) ops.push({ type: "swap", n: parseInt(swapMatch[1], 10) });

  return ops.length > 0 ? { operations: ops } : null;
}

export function applyCipherSpec(s: string, spec: CipherSpec): string {
  let arr = [...s];
  for (const op of spec.operations) {
    switch (op.type) {
      case "reverse":
        arr = arr.reverse();
        break;
      case "splice":
        arr = arr.slice(op.n);
        break;
      case "slice":
        arr = arr.slice(op.n);
        break;
      case "swap":
        if (op.n < arr.length) {
          const tmp = arr[0];
          arr[0] = arr[op.n];
          arr[op.n] = tmp;
        }
        break;
    }
  }
  return arr.join("");
}

export function findDecipherFunc(playerJs: string): { code: string; sts: number } | null {
  // Extract STS (signature timestamp)
  const stsMatch = playerJs.match(/signatureTimestamp\s*:\s*(\d+)/);
  const sts = stsMatch ? parseInt(stsMatch[1], 10) : 0;

  // Look for signature decipher function patterns
  // Pattern 1: a.sig = function(b) { ... }
  const match1 = playerJs.match(/\.sig\s*=\s*function\((\w)\)\s*\{([^}]+)\}/);
  if (match1) return { code: match1[2], sts };

  // Pattern 2: b = function(a) { ... } (where b contains a.sig)
  const sigRef = playerJs.match(/(\w+)\.sig\s*\|\|\s*(\w+)/);
  if (sigRef) {
    const funcName = sigRef[2];
    const funcMatch = playerJs.match(new RegExp(`${funcName}\\s*=\\s*function\\s*\\(\\s*(\\w+)\\s*\\)\\s*\\{([^}]+)\\}`, "i"));
    if (funcMatch) return { code: funcMatch[2], sts };
  }

  // Pattern 3: Try to find any function with reverse() call that could be the decipher
  const withReverse = playerJs.match(/function\s+([\w$]+)\s*\(\s*\w+\s*\)\s*\{([^}]*\.reverse\(\)[^}]*)\}/);
  if (withReverse) return { code: withReverse[2], sts };

  return null;
}

export function solveNTransform(nValue: string, playerJs?: string): string {
  // n-parameter transform is complex and requires running the player JS
  // For now, return the original value (some n values pass through unchanged)
  // In full yt-dlp, this runs the JS function that transforms n
  if (!playerJs) return nValue;

  const nFuncMatch = playerJs.match(/function\s+([\w$]+)\s*\(\s*n\s*\)\s*\{([^}]+)\}/);
  if (!nFuncMatch) return nValue;

  const code = nFuncMatch[2];
  const ops: CipherOp[] = [];
  const revMatch = code.match(/\.reverse\(\)/);
  if (revMatch) ops.push({ type: "reverse" });
  const sliceMatch = code.match(/\.slice\((\d+)\)/);
  if (sliceMatch) ops.push({ type: "slice", n: parseInt(sliceMatch[1], 10) });
  const spliceMatch = code.match(/\.splice\(0,\s*(\d+)\)/);
  if (spliceMatch) ops.push({ type: "splice", n: parseInt(spliceMatch[1], 10) });

  if (ops.length === 0) return nValue;

  const spec: CipherSpec = { operations: ops };
  return applyCipherSpec(nValue, spec);
}

export function decodeUrl(cipher: string): { url: string; sp: string; s: string } | null {
  const params = new URLSearchParams(cipher);
  const url = params.get("url");
  const sp = params.get("sp") ?? "signature";
  const s = params.get("s");
  if (!url) return null;
  return { url, sp, s: s ?? "" };
}
