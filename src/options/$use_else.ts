// Copyright 2020 - present integereleven. All rights reserved. MIT license.

import type { $GetOption, $PickOption } from './base/mod.ts';

const Key = '$$use_else' as const;

export type $UseElseKey = typeof Key;

export type $UseElse<ElseType extends unknown = unknown> = {
  [K in $UseElseKey]: ElseType;
};

export type $Else<Type extends unknown = unknown> = $UseElse<Type>;

export type $GetUseElse<
  Options extends Record<string, unknown>,
> = $GetOption<$UseElseKey, Options>;

export type $PickUseElse<
  Options extends Record<string, unknown>,
> = $PickOption<$UseElseKey, Options>;
