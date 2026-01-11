// Copyright 2020 - present integereleven. All rights reserved. MIT license.

import type { $Else } from './$use_else.ts';
import type { $Then } from './$use_then.ts';

export type $UseCondition<
  Then extends unknown = unknown,
  Else extends unknown = unknown,
> = $Then<Then> & $Else<Else>;

export type $Condition<
  Then extends unknown = unknown,
  Else extends unknown = unknown,
> = $UseCondition<Then, Else>;
