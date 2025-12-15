// Copyright 2020 - present integereleven. All rights reserved. MIT license.

import type { $GetOption, $PickOption } from './base/mod.ts';

const Key = '$$use_immutable' as const;

export type $UseImmutableKey = typeof Key;

export type $UseImmutable<AsImmutable extends boolean = boolean> = {
  [K in $UseImmutableKey]: AsImmutable;
};

export type $AsImmutable = $UseImmutable<true>;

export type $AsMutable = $UseImmutable<false>;

export type $GetUseImmutable<
  Options extends Record<string, unknown>,
> = $GetOption<$UseImmutableKey, Options>;

export type $PickUseImmutable<
  Options extends Record<string, unknown>,
> = $PickOption<$UseImmutableKey, Options>;
