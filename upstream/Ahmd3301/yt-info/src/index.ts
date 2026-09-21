#!/usr/bin/env node
import { extractInfo, isYouTubeUrl } from "./extractor.js";
import { printFormatsTable } from "./formats.js";

function formatDuration(seconds: number): string {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  return h > 0
    ? `${h}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`
    : `${m}:${String(s).padStart(2, "0")}`;
}

async function main() {
  const args = process.argv.slice(2);

  if (args.length === 0 || args[0] === "--help" || args[0] === "-h") {
    console.log("yt-extract-standalone - YouTube video info extractor (no yt-dlp needed)");
    console.log("");
    console.log("Usage:");
    console.log("  node dist/index.js <URL>");
    console.log("  node dist/index.js <URL> --json    JSON output");
    console.log("  node dist/index.js <URL> --urls    Only show URLs");
    console.log("");
    console.log("Examples:");
    console.log("  node dist/index.js https://youtu.be/dQw4w9WgXcQ");
    console.log("  node dist/index.js https://youtu.be/dQw4w9WgXcQ --json");
    return;
  }

  const url = args[0];
  const outputJson = args.includes("--json");
  const outputUrls = args.includes("--urls");

  if (!isYouTubeUrl(url)) {
    console.error("Error: Not a valid YouTube URL");
    process.exit(1);
  }

  try {
    console.error("Extracting video info...");
    const info = await extractInfo(url);

    if (outputJson) {
      console.log(JSON.stringify(info, null, 2));
      return;
    }

    if (outputUrls) {
      for (const f of info.formats) {
        if (f.url) console.log(f.url);
        else console.log(`# ${f.id} (${f.quality}) - No URL (ciphered)`);
      }
      return;
    }

    // Default: pretty output
    console.log("");
    console.log(`Title:     ${info.title}`);
    console.log(`Channel:   ${info.channel}`);
    console.log(`Video ID:  ${info.videoId}`);
    console.log(`Duration:  ${info.durationLabel}`);
    console.log(`Views:     ${info.views.toLocaleString()}`);
    console.log(`Likes:     ${info.likes?.toLocaleString() ?? "N/A"}`);
    console.log(`Published: ${info.publishDate || "N/A"}`);
    console.log(`Thumbnail: ${info.thumbnail}`);
    console.log(`Description:`);
    console.log(`  ${info.description.replace(/\n/g, "\n  ")}`);
    console.log("");

    printFormatsTable(info.formats);
  } catch (err) {
    console.error(`Error: ${err instanceof Error ? err.message : String(err)}`);
    process.exit(1);
  }
}

main();
