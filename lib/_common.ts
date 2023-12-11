export interface CommandSpec {
  repo: string;
  ref: string;
  path: string;
  dest: string;
}

export function parseArgs(args: string[]): CommandSpec {
  /** @example "owner/repo/@main/path/to/file" */
  const joined = args.join("/");

  const matcher = /@([^/]+)/;
  const ref = joined.match(matcher)?.[1] ?? "main";

  const [owner, repo, ...rest] = joined
    .replace(matcher, "")
    .replace(/\/+/g, "/")
    .split("/");

  return {
    repo: `${owner}/${repo}`,
    ref,
    path: rest.join("/"),
    dest: args.at(-1)!,
  };
}

export async function confirm(msg: string) {
  await Deno.stdout.write(new TextEncoder().encode(msg));

  for await (const chunk of Deno.stdin.readable) {
    if (chunk[0] === 121 || chunk[0] === 89) {
      return true;
    } else {
      return false;
    }
  }
  throw new Error("Unreachable");
}
