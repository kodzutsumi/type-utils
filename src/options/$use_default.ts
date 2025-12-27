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
> = $GetOption<$UseDefaultKey, Options>;

export type $PickUseDefault<
  Options extends Record<string, unknown>,
> = $PickOption<$UseDefaultKey, Options>;
