import { confirm, parseArgs } from "../lib/_common.ts";

const HOST = "https://api.github.com";

type ContentJson = FileJson | DirJson;

type FileJson = {
  path: string;
  content: string;
  encoding: string;
};

type DirJson = {
  type: "dir" | "file";
  path: string;
  url: string;
}[];

function isDirResponse(response: ContentJson): response is DirJson {
  return Array.isArray(response);
}

async function hatch(args: string[]) {
  const { repo, ref, path } = parseArgs(args);
  const json = await getContent(
    `${HOST}/repos/${repo}/contents/${path}?ref=${ref}`,
  );
  return isDirResponse(json) ? hatchDir(json) : hatchFile(json);
}

async function getContent(url: string) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(
      `Failed to fetch ${url}: ${response.status} ${response.statusText}`,
    );
  }
  if (!response.body) {
    throw new Error(`Missing body in response for ${url}`);
  }
  return await response.json() as ContentJson;
}

async function hatchDir(dir: DirJson) {
  for (const entry of dir) {
    if (entry.type === "dir") {
      await Deno.mkdir(entry.path);
      await hatchDir(await getContent(entry.url) as DirJson);
    } else {
      await hatchFile(await getContent(entry.url) as FileJson);
    }
  }
}

async function hatchFile(file: FileJson) {
  const { path, content, encoding } = file;
  const info = await Deno.stat(path).catch(() => null);
  if (info?.isFile) {
    const confirmed = await confirm(
      `${path} already exists. Overwrite? [y/N] `,
    );
    if (!confirmed) return;
  }
  if (encoding !== "base64") {
    throw new Error(`Unsupported encoding: ${encoding}`);
  }
  await Deno.writeTextFile(path, atob(content));
  console.log(`🐣 ${path}`);
}

if (import.meta.main) {
  try {
    await hatch(Deno.args);
  } catch (e) {
    console.error(e.message ? `Error: ${e.message}` : e);
    Deno.exit(1);
  }
}
