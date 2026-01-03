// Copyright 2020 - present integereleven. All rights reserved. MIT license.

import type {
$AsUpright,
  $Else,
  $ResolveOptions,
  $Then,
  $UseElse,
  $UseInversion,
  $UseThen,
} from '@kz/type-utils/options';

type Defaults = $Then<true> & $Else<false> & $AsUpright;

export type If<
  Test extends boolean,
  $Options extends $UseThen | $UseElse | $UseInversion = Defaults,
> = $ResolveOptions<Defaults, $Options> extends infer $Resolved
  ? $Resolved extends $Then<infer ThenType> & $Else<infer ElseType>
    ? Test extends true ? ThenType
    : ElseType
  : $Options extends $Then<infer ThenType> & $Else<infer ElseType>
    ? Test extends true ? ThenType
    : ElseType
  : Test extends true ? true
  : false
  : Test extends true ? true
  : false;
