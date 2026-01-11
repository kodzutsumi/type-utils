// Copyright 2020 - present integereleven. All rights reserved. MIT license.

import type { $GetOption, $PickOption } from './base/mod.ts';

const Key = '$$use_default' as const;

export type $UseDefaultKey = typeof Key;

export type $UseDefault<DefaultType extends unknown = unknown> = {
  [K in $UseDefaultKey]: DefaultType;
};

export type $DefaultTo<Type extends unknown = unknown> = $UseDefault<Type>;

export type $GetUseDefault<
  Options extends Record<string, unknown>,
  Default extends unknown = never,
> = $GetOption<Options, $UseDefaultKey, Default>;

export type $PickUseDefault<
  Options extends Record<string, unknown>,
  Default extends unknown = never,
> = $PickOption<Options, $UseDefaultKey, Default>;
