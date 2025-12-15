// Copyright 2020 - present integereleven. All rights reserved. MIT license.

import type { $GetOption, $PickOption } from './base/mod.ts';

const Key = '$$use_inversion' as const;

export type $UseInversionKey = typeof Key;

export type $UseInversion<AsInverted extends boolean = boolean> = {
  [K in $UseInversionKey]: AsInverted;
};

export type $AsInverted = $UseInversion<true>;

export type $AsUpright = $UseInversion<false>;

export type $GetUseInversion<
  Options extends Record<string, unknown>,
> = $GetOption<$UseInversionKey, Options>;

export type $PickUseInversion<
  Options extends Record<string, unknown>,
> = $PickOption<$UseInversionKey, Options>;
