import { assertEquals } from "https://deno.land/std@0.208.0/assert/assert_equals.ts";
import { parseArgs } from "./_common.ts";

Deno.test("parseArgs", () => {
  assertEquals(
    parseArgs(["owner/repo", "path/to/file"]),
    {
      repo: "owner/repo",
      ref: "main",
      path: "path/to/file",
    },
  );
  assertEquals(
    parseArgs(["owner/repo@dev", "path/to/file"]),
    {
      repo: "owner/repo",
      ref: "dev",
      path: "path/to/file",
    },
  );
  assertEquals(
    parseArgs(["owner", "repo", "path/to/file"]),
    {
      repo: "owner/repo",
      ref: "main",
      path: "path/to/file",
    },
  );
  assertEquals(
    parseArgs(["owner", "repo", "path", "to", "file"]),
    {
      repo: "owner/repo",
      ref: "main",
      path: "path/to/file",
    },
  );
  assertEquals(
    parseArgs(["owner", "repo", "@dev", "path", "to", "file"]),
    {
      repo: "owner/repo",
      ref: "dev",
      path: "path/to/file",
    },
  );
});
