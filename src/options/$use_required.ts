// Copyright 2020 - present integereleven. All rights reserved. MIT license.

import type { $GetOption, $PickOption } from './base/mod.ts';

const Key = '$$use_required' as const;

export type $UseRequiredKey = typeof Key;

export type $UseRequired<AsImmutable extends boolean = boolean> = {
  [K in $UseRequiredKey]: AsImmutable;
};

export type $AsRequired = $UseRequired<true>;

export type $AsOptional = $UseRequired<false>;

export type $GetUseRequired<
  Options extends Record<string, unknown>,
> = $GetOption<$UseRequiredKey, Options>;

export type $PickUseRequired<
  Options extends Record<string, unknown>,
> = $PickOption<$UseRequiredKey, Options>;
