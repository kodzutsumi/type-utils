// Copyright 2020 - present integereleven. All rights reserved. MIT license.

import type { $Else, $ResolveOptions, $Then, $UseElse, $UseInversion, $UseThen } from '@kz/type-utils/options';

import type { If } from './if.ts';
import type { Not } from './not.ts';

type Defaults = $Then<true> & $Else<false>;

export type Xor<
  TestA extends boolean,
  TestB extends boolean,
  $Options extends $UseThen | $UseElse | $UseInversion = Defaults,
> = $ResolveOptions<Defaults, $Options> extends
  infer $Resolved extends $UseThen | $UseElse | $UseInversion
  ? If<
  TestA,
  & $Then<If<Not<TestB>, $Resolved>>
  & $Else<If<TestB, $Resolved>>
>
  : If<
  TestA,
  & $Then<If<Not<TestB>, $Options>>
  & $Else<If<TestB, $Options>>
>;
