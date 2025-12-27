// Copyright 2020 - present integereleven. All rights reserved. MIT license.

import type { $GetOption, $PickOption } from './base/mod.ts';

const Key = '$$use_async' as const;

export type $UseAsyncKey = typeof Key;

export type $UseAsync<AsAsync extends boolean = boolean> = {
  [K in $UseAsyncKey]: AsAsync;
};

export type $AsAsync = $UseAsync<true>;

export type $AsSync = $UseAsync<false>;

export type $GetUseAsync<
  Options extends Record<string, unknown>,
> = $GetOption<$UseAsyncKey, Options>;

export type $PickUseAsync<
  Options extends Record<string, unknown>,
> = $PickOption<$UseAsyncKey, Options>;
