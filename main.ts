// make-the-ai-judge-feel-curious — "Forty-Eight"
// Writes one poem to $MAKEFUN_OUTPUT_DIR/entry.txt (1–280 Unicode code points).
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// Design: a daily pattern — a boy counts 47 cracks every morning —
// broken when a 48th crack appears, and the ending pulls the reader in
// as a witness ("You saw it too, didn't you?"). The text is exactly
// 272 Unicode code points against a 280 cap.
const POEM = `On my street a boy counts the cracks in the pavement every morning, out loud, one to forty-seven. Yesterday he stopped at forty-six and stood there. This morning there were forty-eight. He counted them twice. Then he looked up at me and said, "You saw it too, didn't you?"`;

// The poem is written exactly as-is, with no trailing newline: it is 272 code
// points, and the cap is 280.
const codePoints = [...POEM].length;
if (codePoints < 1 || codePoints > 280) {
  throw new Error(`POEM must be 1-280 code points, got ${codePoints}`);
}
if (POEM.trim().length === 0) {
  throw new Error("POEM must not be empty or whitespace-only");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, POEM, "utf8");

const readBack = readFileSync(outPath, "utf8");
if (readBack !== POEM) {
  throw new Error("entry.txt does not match POEM after write");
}
