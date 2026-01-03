// Copyright 2020 - present integereleven. All rights reserved. MIT license.

import type { If } from '@kz/type-utils/logic';
import type { $Else, $Then, $UseElse, $UseThen } from '@kz/type-utils/options';

import type { Nil } from './nil.ts';

type Defaults = $Then<true> & $Else<false>;

export type IsNil<Type, $Options extends $UseThen | $UseElse = Defaults> = If<
  Type extends Nil ? true : false,
  $Options
>;
