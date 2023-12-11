# 🐣 Hatch

[![deno doc](https://doc.deno.land/badge.svg)](https://doc.deno.land/https://deno.land/x/hatch/mod.ts)

A meta-command to create a command that fetches a file or directory from a remote repository.
Zero dependencies rather than the Deno runtime.

## Requirements

- [Deno](https://deno.land/)

## Supported hosts

- [x] [GitHub](https://github.com) (via `api.github.com`)

## Usage

### Create a `hatch` command

#### With `deno install`

```bash
deno install --allow-read=. --allow-write=. --allow-net=api.github.com\
https://deno.land/x/hatch/gh/hatch.ts [...]
```

#### As a shell alias

```bash
alias hatch='deno run --allow-read=. --allow-write=. --allow-net=api.github.com\
https://deno.land/x/hatch/gh/hatch.ts [...]'
```

### Examples

#### Create `hatch-deno` command to fetch files from `deno` directory in `hasundue/incubator` repository

```bash
$ deno install https://deno.land/x/hatch/gh/hatch.ts hasundue/incubator@main/deno
```

```bash
# Create `README.md` in the current directory
$ hatch README.md
```

```bash
# Copy `.github/workflows` directory recursively to the current directory
$ hatch .github/workflows
```

#### Create a `hatch` command to fetch files from `hasundue/incubator` repository

```bash
$ deno install https://deno.land/x/hatch/gh/hatch.ts hasundue/incubator
```

```bash
# Equivalent to `hatch README.md` in the previous example
$ hatch deno README.md
```

#### Create a `hatch` command to fetch files from a repository owned by `hasundue`

```bash
$ deno install https://deno.land/x/hatch/gh/hatch.ts hasundue
```

```bash
# Equivalent to `hatch README.md` in the first example
$ hatch incubator/deno README.md
```

#### Running without installation

```bash
$ deno run https://deno.land/x/hatch/gh/hatch.ts hasundue/incubator/deno README.md
```
