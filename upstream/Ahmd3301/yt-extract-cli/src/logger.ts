const LEVELS = { error: 0, warn: 1, info: 2, debug: 3 } as const;
type Level = keyof typeof LEVELS;

const PREFIXES: Record<Level, string> = {
  error: "ERR",
  warn: "WRN",
  info: "INF",
  debug: "DBG",
};

function log(level: Level, msg: string, data?: unknown) {
  const line = `[${PREFIXES[level]}] ${msg}${data !== undefined ? " " + JSON.stringify(data) : ""}`;
  if (level === "error") {
    process.stderr.write(line + "\n");
  } else {
    process.stdout.write(line + "\n");
  }
}

export const logger = {
  error: (msg: string, err?: unknown) => log("error", msg, err),
  warn: (msg: string, data?: unknown) => log("warn", msg, data),
  info: (msg: string, data?: unknown) => log("info", msg, data),
  debug: (msg: string, data?: unknown) => log("debug", msg, data),
};
