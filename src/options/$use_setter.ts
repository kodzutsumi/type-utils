// Copyright 2020 - present integereleven. All rights reserved. MIT license.

import type { $GetOption, $PickOption } from './base/mod.ts';

const Key = '$$use_setter' as const;

export type $UseSetterKey = typeof Key;

export type $UseSetter<AsSetter extends boolean = boolean> = {
  [K in $UseSetterKey]: AsSetter;
};

export type $AsSetter = $UseSetter<true>;
export type $AsGetter = $UseSetter<false>;

export type $GetUseSetter<
  Options extends Record<string, unknown>,
> = $GetOption<$UseSetterKey, Options>;

export type $PickUseSetter<
  Options extends Record<string, unknown>,
> = $PickOption<$UseSetterKey, Options>;
