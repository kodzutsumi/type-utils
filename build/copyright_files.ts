// Copyright 2020 - present integereleven. All rights reserved. MIT license.

// deno-lint-ignore-file no-external-import

import { walk, type WalkOptions } from 'jsr:@std/fs@^1.0.6';
import { globToRegExp } from 'jsr:@std/path@^1.0.6';

const START_YEAR = '2020';
const REGEX_COPYRIGHT_HEADER =
  /^\/\/ Copyright (\d{4}) - present integereleven\. All rights reserved\. MIT license\./;
const REGEX_ANY_COPYRIGHT_HEADER = /^\/\/\s*Copyright/;
const COPYRIGHT_HEADER =
  `// Copyright ${START_YEAR} - present integereleven. All rights reserved. MIT license.`;
const EXCLUDED_GLOBS = [
  '**/docs/**',
  '**/*.fixture.ts',
  '**/*.test.ts',
  '**/.git',
];
const BASE_URL = import.meta.url;

{
  const HEADER_TEST = COPYRIGHT_HEADER.match(REGEX_COPYRIGHT_HEADER);

  if (!HEADER_TEST) {
    throw new Error(`Invalid COPYRIGHT_HEADER\n--> ${COPYRIGHT_HEADER}`);
  }
}

/**
 * Script to check for copyright header in files.
 *
 * The following copyright header should be present as the top-most part of
 * the file, following any directives, and must have an empty line after it.
 *
 * We consider any single line comment (`// @`) as a directive:
 *
 * ```
 * // Copyright 2020 - {CURRENT_YEAR} integereleven. All rights reserved. MIT license.
 * ```
 *
 * For example, if the current year is 2024, the header should be:
 *
 * ```
 *
 * // File implementation
 * ```
 *
 * With directives.
 *
 * ```
 * // deno-lint-ignore-file ban-types
 *
 * // File implementation
 * ```
 *
 * The script will automatically update the year to the current year.
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
    {
      const text = await Deno.readTextFile(path);
      const lines = text.split('\n');
      const cleanedLines = lines.filter((line) =>
        !line.match(REGEX_ANY_COPYRIGHT_HEADER)
      );
      const content = cleanedLines.join('\n');

      await Deno.writeTextFile(path, content);
    }

    const text = await Deno.readTextFile(path);
    const lines = text.split('\n');
    const index = lines.findLastIndex((line) => line.match(/^\/\/\s*@/));
    const newLines = lines.slice(0, index + 1);

    newLines.push(COPYRIGHT_HEADER);
    newLines.push('');

    const content = newLines.concat(lines.slice(index + 1)).join('\n');

    await Deno.writeTextFile(path, content);

    console.info(`Wrote copyright: ${path}`);
  }
}

main();
