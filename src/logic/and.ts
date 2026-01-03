// Copyright 2020 - present integereleven. All rights reserved. MIT license.

import type {
  $AsUpright,
  $Else,
  $PickUseElse,
  $ResolveOptions,
  $Then,
  $UseElse,
  $UseInversion,
  $UseThen,
} from '@kz/type-utils/options';

import type { If } from './if.ts';

type Defaults = $Then<true> & $Else<false> & $AsUpright;

export type And<
  TestA extends boolean,
  TestB extends boolean,
  $Options extends $UseThen | $UseElse | $UseInversion = Defaults,
> = $ResolveOptions<Defaults, $Options> extends
  infer $Resolved extends $UseThen | $UseElse | $UseInversion ? If<
    TestA,
    & $Then<If<TestB, $Resolved>>
    & $PickUseElse<$Resolved>
  >
  : If<
    TestA,
    & $Then<If<TestB, $Options>>
    & $PickUseElse<$Options>
  >;
