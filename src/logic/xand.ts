// Copyright 2020 - present integereleven. All rights reserved. MIT license.

import type { $Else, $Then, $UseElse, $UseThen } from '@kz/type-utils/options';

import type { If } from './if.ts';

type Defaults = $Then<true> & $Else<false>;

export type Xand<
  OperandA extends boolean,
  OperandB extends boolean,
  $Options extends $UseThen | $UseElse = Defaults,
> = If<
  OperandA extends true ? OperandB extends true ? true
    : false
    : OperandB extends true ? false
    : true,
  $Options
>;
