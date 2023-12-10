/**
 * Create a command to fetch files from a remote Git repository via `deno install`.
 * Zero dependencies rather than the Deno runtime.
 *
 * @module
 */
export { hatch as hatchGh } from "./gh/hatch.ts";
