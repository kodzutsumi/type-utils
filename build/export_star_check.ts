// Copyright 2020 - present integereleven. All rights reserved. MIT license.

// deno-lint-ignore-file no-external-import

import { walk, type WalkOptions } from 'jsr:@std/fs@^1.0.6';
import { globToRegExp } from 'jsr:@std/path@^1.0.6';

const REGEX_EXPORT_STAR = /export.+\*.+from ['"](.+)['"]/;
const EXCLUDED_GLOBS = [
  '**/docs/**',
  '**/*.fixture.ts',
  '**/*.test.ts',
  '**/.git',
];
const BASE_URL = import.meta.url;

/**
 * Script to check for `export *` in files.
 *
 * We allow the `export *` in `mod.ts` files as they re-export from other
 * `mod.ts` files. This is to ensure we are well-aware of what is being exported into the
 * public API.
 *
 * ```bash
 * root/
 * |-- mod.ts       // 1
 * |-- folder/
 * |   |-- mod.ts   // 2
 * |   |-- file.ts  // 3
 * ```
 *
 * 1. Can re-export the contents of `root/folder/mod.ts` (2).
 * 2. Must explicitly export the contents of `root/folder/file.ts` (3).
 * 3. Must explicitly export its contents.
 */
async function main(args: string[]): Promise<void> {
  const verbose = args.includes('--verbose');
  const root = new URL('../', BASE_URL);
  const options: WalkOptions = {
    includeDirs: false,
    skip: EXCLUDED_GLOBS.map((glob) => globToRegExp(glob)),
    exts: ['.ts'],
  };
  const paths = walk(root, options);

  for await (const { path } of paths) {
    const text = await Deno.readTextFile(path);
    const lines = text.split('\n');

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      const match = line.match(REGEX_EXPORT_STAR);

      if (!match) continue;

      const [_, from] = match;

      if (!from) continue;

      if (from.endsWith('mod.ts')) {
        continue;
      }

      console.error(
        `Invalid export: ${path}:${i + 1}:${match.index}${
          verbose ? `\n--> ${_}` : ''
        }`,
      );
    }
  }
}

main(Deno.args);
