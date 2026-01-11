// Copyright 2020 - present integereleven. All rights reserved. MIT license.

import type {
  $Else,
  $FlipOptions,
  $Then,
  $UseElse,
  $UseThen,
} from '@kz/type-utils/options';

import type { If } from './if.ts';

type Defaults = $Then<true> & $Else<false>;

export type Not<
  Operand extends boolean,
  $Options extends $UseThen | $UseElse = Defaults,
> = If<Operand, $FlipOptions<$Options>>;
