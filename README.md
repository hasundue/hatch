# Create

Create a script to create files with a GitHub repository as a template.

## Features

- Zero dependencies rather than the Deno runtime

## Requirements

- [Deno](https://deno.land/)

## Usage

### Installation (optional)

```bash
$ deno install -f -A https://cdn.jsdelivr.net/gh/hasundue/create@{ref}/main.ts [repository] [ref]
```

### Example

#### Install latest version of `create` with `main` branch of `hasundue/create` repository as a template

```bash
$ deno install -f -A --name create https://cdn.jsdelivr.net/gh/hasundue/create/main.ts hasundue/create main
```

#### Create README.md and LICENSE

```bash
$ create README.md LICENSE
```

#### Running without installation

```bash
$ deno run https://cdn.jsdelivr.net/gh/hasundue/create/main.ts hasundue/create main README.md LICENSE
```
