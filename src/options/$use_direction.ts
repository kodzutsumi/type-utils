// Copyright 2020 - present integereleven. All rights reserved. MIT license.

import type { $GetOption, $PickOption } from './base/mod.ts';

const Key = '$$use_direction' as const;

export type $UseDirectionKey = typeof Key;

export type $UseDirection<AsDirection extends boolean = boolean> = {
  [K in $UseDirectionKey]: AsDirection;
};

export type $AsReverse = $UseDirection<true>;

export type $AsForward = $UseDirection<false>;

export type $GetUseDirection<
  Options extends Record<string, unknown>,
> = $GetOption<$UseDirectionKey, Options>;

export type $PickUseDirection<
  Options extends Record<string, unknown>,
> = $PickOption<$UseDirectionKey, Options>;
