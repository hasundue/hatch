# Hatch

Create a script to create files with a remote Git repository as a template. Zero
dependencies rather than the Deno runtime.

## Requirements

- [Deno](https://deno.land/)

## Usage

### Installation (optional)

```bash
$ deno install https://deno.land/x/hatch@{VERSION}/gh/hatch.ts [...]
```

### Example

#### Install latest version of `hatch` with the default branch of `hasundue/incubator` repository as a template

```bash
$ deno install https://deno.land/x/hatch@{VERSION}/gh/hatch.ts hasundue/incubator
```

#### Create README.md

```bash
$ hatch README.md
```

#### Running without installation

```bash
$ deno run https://deno.land/x/hatch@{VERSION}/gh/hatch.ts hasundue/incubator README.md
```
