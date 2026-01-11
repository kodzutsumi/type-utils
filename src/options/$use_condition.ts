// Copyright 2020 - present integereleven. All rights reserved. MIT license.

import type { $Else } from './$use_else.ts';
import type { $Then } from './$use_then.ts';
import type { $AnyType } from './base/_any.ts';

export type $UseCondition<
  Then extends $AnyType = $AnyType,
  Else extends $AnyType = $AnyType,
> = $Then<Then> & $Else<Else>;

export type $Condition<
  Then extends $AnyType = $AnyType,
  Else extends $AnyType = $AnyType,
> = $UseCondition<Then, Else>;
