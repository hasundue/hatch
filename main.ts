async function main(args: string[]) {
  const [repo, ref, ...rest] = args;

  for (const file of rest) {
    const response = await fetch(
      `https://raw.githubusercontent.com/${repo}/${ref}/${file}`,
    );
    if (!response.ok) {
      throw new Error(
        `Failed to fetch ${file} from github:${repo}@${ref}: ${response.status} ${response.statusText}`,
      );
    }
    if (!response.body) {
      throw new Error(`Missing body in response for ${file}`);
    }
    const info = await Deno.stat(file).catch(() => null);
    if (info?.isFile) {
      await Deno.stdout.write(
        new TextEncoder().encode(
          `${file} already exists. Overwrite? [y/N] `,
        ),
      );
      for await (const chunk of Deno.stdin.readable) {
        if (chunk[0] === 121 || chunk[0] === 89) {
          break;
        } else if (chunk[0] === 110 || chunk[0] === 78) {
          console.log("Aborted");
          return;
        }
      }
    }
    await Deno.writeFile(file, response.body);
    console.log(`Saved ${file}`);
  }
}

if (import.meta.main) {
  try {
    await main(Deno.args);
  } catch (e) {
    console.error(e.message ?? e);
    Deno.exit(1);
  }
}
