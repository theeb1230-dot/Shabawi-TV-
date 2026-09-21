#!/usr/bin/env node
import { extractInfo } from "./extractor.js";
import { formatSuccess, formatError } from "./formatter.js";
import { logger } from "./logger.js";

async function main() {
  const args = process.argv.slice(2);
  if (args.length === 0 || args[0] === "--help" || args[0] === "-h") {
    console.log("yt-extract <youtube-url>");
    console.log("Extract YouTube video info and direct links without downloading.");
    process.exit(args.length === 0 ? 1 : 0);
  }

  const url = args[0];
  if (args.includes("--json") || args.includes("-j")) {
    logger.debug("JSON mode enabled");
  }

  try {
    const info = await extractInfo(url);
    const output = formatSuccess(info);
    console.log(JSON.stringify(output, null, 2));
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    logger.error("Extraction failed", msg);
    const output = formatError(msg);
    console.log(JSON.stringify(output, null, 2));
    process.exit(1);
  }
}

main();
