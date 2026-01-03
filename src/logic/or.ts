// Copyright 2020 - present integereleven. All rights reserved. MIT license.

import type {
  $Else,
  $PickUseThen,
  $ResolveOptions,
  $Then,
  $UseElse,
  $UseInversion,
  $UseThen,
} from '@kz/type-utils/options';

import type { If } from './if.ts';

type Defaults = $Then<true> & $Else<false>;

export type Or<
  TestA extends boolean,
  TestB extends boolean,
  $Options extends $UseThen | $UseElse | $UseInversion = Defaults,
> = $ResolveOptions<Defaults, $Options> extends
  infer $Resolved extends $UseThen | $UseElse | $UseInversion ? If<
    TestA,
    & $PickUseThen<$Resolved>
    & $Else<If<TestB, $Resolved>>
  >
  : If<
    TestA,
    & $PickUseThen<$Options>
    & $Else<If<TestB, $Options>>
  >;
