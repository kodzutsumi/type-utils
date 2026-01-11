// Copyright 2020 - present integereleven. All rights reserved. MIT license.

import type {
  $AsFilter,
  $AsPredicate,
  $Condition,
  $DefaultTo,
  $ResolveOptions,
  $UseDefault,
  $UseElse,
  $UseFilter,
  $UseThen,
} from '@kz/type-utils/options';

type Defaults = $Condition<true, false> & $AsPredicate & $DefaultTo<true>;

export type If<
  Operand extends boolean,
  $Options extends $UseThen | $UseElse | $UseFilter | $UseDefault =
    & $Condition<true, false>
    & $AsPredicate
    & $DefaultTo<true>,
> = InnerIf<
  Operand,
  $ResolveOptions<
    $Condition<true, false> & $AsPredicate & $DefaultTo<true>,
    $Options
  >
>;

type InnerIf<Operand extends boolean, $Options> = $Options extends $AsFilter
  ? $Options extends $DefaultTo<infer DefaultType>
    ? Operand extends true ? DefaultType : never
  : Operand extends true ? true
  : never
  : $Options extends $UseThen<infer TrueType> & $UseElse<infer FalseType>
    ? Operand extends true ? TrueType : FalseType
  : $Options extends $UseThen<infer TrueType>
    ? Operand extends true ? TrueType : false
  : $Options extends $UseElse<infer FalseType>
    ? Operand extends true ? true : FalseType
  : Operand;

type Digit = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
type IsDigit<
  Int,
  $Options extends (
    $UseThen | $UseElse | $UseFilter
  ) = Defaults,
> = If<
  Int extends Digit ? true : false,
  $Options & $DefaultTo<Digit>
>;
type Filter = IsDigit<''>;
