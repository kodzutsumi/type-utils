// Copyright 2020 - present integereleven. All rights reserved. MIT license.

import type { $AnyType } from './_any.ts';

export type $PickOption<
  $Options,
  Key extends string,
  Default extends $AnyType,
> = Key extends keyof $Options ? { [K in Key]: $Options[Key] }
  : { [K in Key]: Default };
