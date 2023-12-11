import { join } from "https://deno.land/std@0.208.0/path/join.ts";
import { confirm, parseArgs } from "../lib/_common.ts";

type ContentJson = FileJson | DirJson;

type FileJson = {
  name: string;
  content: string;
  encoding: string;
};

type DirJson = {
  type: string;
  name: string;
  url: string;
}[];

function isDirJson(response: ContentJson): response is DirJson {
  return Array.isArray(response);
}

async function getContent(url: string) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(
      `Failed to fetch ${url}: ${response.status} ${response.statusText}`,
    );
  }
  return response.json() as Promise<ContentJson>;
}

/**
 * Fetches a file or directory from GitHub
 */
export async function hatch(args: string[]) {
  const { repo, ref, path, dest } = parseArgs(args);
  const json = await getContent(
    `https://api.github.com/repos/${repo}/contents/${path}?ref=${ref}`,
  );
  return isDirJson(json) ? hatchDir(json, dest) : hatchFile(json, dest);
}

async function hatchDir(dir: DirJson, dest: string) {
  await Deno.mkdir(dest, { recursive: true });
  for (const entry of dir) {
    const content = await getContent(entry.url);
    if (entry.type === "dir") {
      await hatchDir(content as DirJson, join(dest, entry.name));
    } else {
      await hatchFile(content as FileJson, join(dest, entry.name));
    }
  }
}
async function hatchFile(file: FileJson, dest: string) {
  const { content, encoding } = file;
  const info = await Deno.stat(dest).catch(() => null);
  if (info?.isFile) {
    const confirmed = await confirm(
      `${dest} already exists. Overwrite? [y/N] `,
    );
    if (!confirmed) return;
  }
  if (encoding !== "base64") {
    throw new Error(`Unsupported encoding: ${encoding}`);
  }
  await Deno.writeTextFile(dest, atob(content));
  console.log(`🐣 ${dest}`);
}

if (import.meta.main) {
  try {
    await hatch(Deno.args);
  } catch (e) {
    console.error(e.message ? `Error: ${e.message}` : e);
    Deno.exit(1);
  }
}
