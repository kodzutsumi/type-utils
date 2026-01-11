// Copyright 2020 - present integereleven. All rights reserved. MIT license.

import type { $GetOption, $PickOption } from './base/mod.ts';

const Key = '$$use_then' as const;

export type $UseThenKey = typeof Key;

export type $UseThen<ThenType extends unknown = unknown> = {
  [K in $UseThenKey]: ThenType;
};

export type $Then<Type extends unknown = unknown> = $UseThen<Type>;

export type $GetUseThen<
  Options extends Record<string, unknown>,
  Default extends unknown = true,
> = $GetOption<Options, $UseThenKey, Default>;

export type $PickUseThen<
  Options extends Record<string, unknown>,
  Default extends unknown = true,
> = $PickOption<Options, $UseThenKey, Default>;
