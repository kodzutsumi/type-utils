// Copyright 2020 - present integereleven. All rights reserved. MIT license.

import type { $GetOption, $PickOption } from './base/mod.ts';

const Key = '$$use_filter' as const;

export type $UseFilterKey = typeof Key;

export type $UseFilter<AsFilter extends boolean = boolean> = {
  [Key]: AsFilter;
};

export type $AsFilter = $UseFilter<true>;

export type $AsPredicate = $UseFilter<false>;

export type $GetUseFilter<
  Options extends Record<string, unknown>,
  Default extends boolean = false,
> = $GetOption<Options, $UseFilterKey, Default>;

export type $PickUseFilter<
  Options extends Record<string, unknown>,
  Default extends boolean = false,
> = $PickOption<Options, $UseFilterKey, Default>;
