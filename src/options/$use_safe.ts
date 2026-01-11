// Copyright 2020 - present integereleven. All rights reserved. MIT license.

import type { $GetOption, $PickOption } from './base/mod.ts';

const Key = '$$use_safe' as const;

export type $UseSafeKey = typeof Key;

export type $UseSafe<AsSafe extends boolean = boolean> = {
  [K in $UseSafeKey]: AsSafe;
};

export type $AsSafe = $UseSafe<true>;

export type $AsUnsafe = $UseSafe<false>;

export type $GetUseSafe<
  Options extends Record<string, unknown>,
  Default extends boolean = false,
> = $GetOption<Options, $UseSafeKey, Default>;

export type $PickUseSafe<
  Options extends Record<string, unknown>,
  Default extends boolean = false,
> = $PickOption<Options, $UseSafeKey, Default>;
