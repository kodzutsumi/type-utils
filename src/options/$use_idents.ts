// Copyright 2020 - present integereleven. All rights reserved. MIT license.

import type { $GetOption, $PickOption } from './base/mod.ts';

const IdentsTypeKey = '$$use_idents_type' as const;
const IdentsKey = '$$use_idents' as const;

export type $UseIdentsTypeKey = typeof IdentsTypeKey;
export type $UseIdentsKey = typeof IdentsKey;

export type $UseIdents<
  DefaultType extends unknown = unknown,
  Idents extends PropertyKey = keyof DefaultType,
> =
  & {
    [K in $UseIdentsTypeKey]: DefaultType;
  }
  & {
    [K in $UseIdentsKey]: Idents;
  };

export type $IdentsOf<
  Type extends unknown = unknown,
  Idents extends PropertyKey = keyof Type,
> = $UseIdents<Type, Idents>;

export type $GetUseIdents<
  Options extends Record<string, unknown>,
  Default extends PropertyKey = PropertyKey,
> = $GetOption<Options, $UseIdentsKey, Default>;

export type $PickUseIdents<
  Options extends Record<string, unknown>,
  Default extends PropertyKey = PropertyKey,
> = $PickOption<Options, $UseIdentsKey, Default>;
