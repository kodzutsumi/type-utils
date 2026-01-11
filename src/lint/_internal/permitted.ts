// Copyright 2020 - present integereleven. All rights reserved. MIT license.

import type { BannedTypes } from '../banned_types.ts';

export type Permitted<
  Type extends keyof BannedTypes,
  Reason extends string,
> = Reason extends string ? Reason extends '' ? never : BannedTypes[Type]
  : never;
