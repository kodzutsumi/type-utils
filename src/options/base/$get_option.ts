// Copyright 2020 - present integereleven. All rights reserved. MIT license.

import type { $PickOption } from './$pick_option.ts';
import type { $AnyType } from './_any.ts';

export type $GetOption<
  $Options,
  Key extends string,
  Default extends $AnyType,
> = $PickOption<$Options, Key, Default> extends infer PickedOption
  ? PickedOption extends Record<Key, infer Type> ? Type
  : Default
  : Default;
