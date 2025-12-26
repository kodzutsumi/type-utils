// Copyright 2020 - present integereleven. All rights reserved. MIT license.

import type { $GetOption, $PickOption } from './base/mod.ts';

const Key = '$$use_filter' as const;

export type $UseFilterKey = typeof Key;

export type $UseFilter<AsFilter extends boolean = boolean> = {
  [K in $UseFilterKey]: AsFilter;
};

export type $AsFilter = $UseFilter<true>;

export type $AsPredicate = $UseFilter<false>;

export type $GetUseFilter<
  Options extends Record<string, unknown>,
> = $GetOption<$UseFilterKey, Options>;

export type $PickUseFilter<
  Options extends Record<string, unknown>,
> = $PickOption<$UseFilterKey, Options>;
