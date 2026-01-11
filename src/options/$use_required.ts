// Copyright 2020 - present integereleven. All rights reserved. MIT license.

import type { $GetOption, $PickOption } from './base/mod.ts';

const Key = '$$use_required' as const;

export type $UseRequiredKey = typeof Key;

export type $UseRequired<AsRequired extends boolean = boolean> = {
  [K in $UseRequiredKey]: AsRequired;
};

export type $AsRequired = $UseRequired<true>;

export type $AsOptional = $UseRequired<false>;

export type $GetUseRequired<
  Options extends Record<string, unknown>,
  Default extends boolean = false,
> = $GetOption<Options, $UseRequiredKey, Default>;

export type $PickUseRequired<
  Options extends Record<string, unknown>,
  Default extends boolean = false,
> = $PickOption<Options, $UseRequiredKey, Default>;
