// Copyright 2020 - present integereleven. All rights reserved. MIT license.

import type { $GetOption, $PickOption } from './base/mod.ts';

const Key = '$$use_exclusion' as const;

export type $UseExclusionKey = typeof Key;

export type $UseExclusion<AsExclusion extends boolean = boolean> = {
  [K in $UseExclusionKey]: AsExclusion;
};

export type $AsExcluded = $UseExclusion<true>;

export type $AsIncluded = $UseExclusion<false>;

export type $GetUseExclusion<
  Options extends Record<string, unknown>,
  Default extends boolean = false,
> = $GetOption<Options, $UseExclusionKey, Default>;

export type $PickUseExclusion<
  Options extends Record<string, unknown>,
  Default extends boolean = false,
> = $PickOption<Options, $UseExclusionKey, Default>;
