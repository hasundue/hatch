export interface PathSpec {
  owner: string;
  repo: string;
  ref: string;
  path: string;
}

export function parseArgs(args: string[]): PathSpec {
  /** @example "owner/repo/@main/path/to/file" */
  const joined = args.join("/");

  const matcher = /@([^/]+)/;
  const ref = joined.match(matcher)?.[1] ?? "main";

  const [owner, repo, ...path] = joined
    .replace(matcher, "")
    .replace(/\/+/g, "/")
    .split("/");

  return { owner, repo, ref, path: path.join("/") };
}
