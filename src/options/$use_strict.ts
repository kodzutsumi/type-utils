// Copyright 2020 - present integereleven. All rights reserved. MIT license.

import type { $GetOption, $PickOption } from './base/mod.ts';

const Key = '$$use_strict' as const;

export type $UseStrictKey = typeof Key;

export type $UseStrict<AsStrict extends boolean = boolean> = {
  [K in $UseStrictKey]: AsStrict;
};

export type $AsStrict = $UseStrict<true>;

export type $AsLoose = $UseStrict<false>;

export type $GetUseStrict<
  Options extends Record<string, unknown>,
  Default extends boolean = false,
> = $GetOption<Options, $UseStrictKey, Default>;

export type $PickUseStrict<
  Options extends Record<string, unknown>,
  Default extends boolean = false,
> = $PickOption<Options, $UseStrictKey, Default>;
