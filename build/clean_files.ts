// Copyright 2020 - present integereleven. All rights reserved. MIT license.

// deno-lint-ignore-file no-external-import

import { walk, type WalkOptions } from 'jsr:@std/fs@^1.0.6';
import { globToRegExp } from 'jsr:@std/path@^1.0.6';

const EXCLUDED_GLOBS = [
  '**/docs/**',
  '**/*.fixture.ts',
  '**/*.test.ts',
  '**/.git',
];
const BASE_URL = import.meta.url;

/**
 * Script to clean files.
 *
 * Currently only cleans excessively empty lines.
 */
async function main(): Promise<void> {
  const root = new URL('../', BASE_URL);
  const options: WalkOptions = {
    includeDirs: false,
    skip: EXCLUDED_GLOBS.map((glob) => globToRegExp(glob)),
    exts: ['.ts'],
  };
  const paths = walk(root, options);

  for await (const { path } of paths) {
    const text = await Deno.readTextFile(path);
    const content = text.replace(/(\n\s*){3,}/g, '\n\n');

    await Deno.writeTextFile(path, content);

    console.info(`Cleaned file: ${path}`);
  }
}

main();
