import { confirm, parseArgs } from "../lib/_common.ts";

const HOST = "https://api.github.com";

interface ContentResponse {
  content: string;
  encoding: string;
}

async function hatch(args: string[]) {
  const { repo, ref, path } = parseArgs(args);

  const response = await fetch(
    `${HOST}/repos/${repo}/contents/${path}?ref=${ref}`,
  );
  if (!response.ok) {
    throw new Error(
      `Failed to fetch ${path} from ${repo}@${ref}: ${response.status} ${response.statusText}`,
    );
  }
  if (!response.body) {
    throw new Error(`Missing body in response for ${path}`);
  }
  const info = await Deno.stat(path).catch(() => null);
  if (info?.isFile) {
    const confirmed = await confirm(
      `${path} already exists. Overwrite? [y/N] `,
    );
    if (!confirmed) return;
  }
  const { content, encoding } = await response.json() as ContentResponse;
  if (encoding !== "base64") {
    throw new Error(`Unsupported encoding: ${encoding}`);
  }
  await Deno.writeTextFile(path, atob(content));
  console.log(`Saved ${path}`);
}

if (import.meta.main) {
  try {
    await hatch(Deno.args);
  } catch (e) {
    console.error(e.message ? `Error: ${e.message}` : e);
    Deno.exit(1);
  }
}
