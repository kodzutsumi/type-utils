// Copyright 2020 - present integereleven. All rights reserved. MIT license.

import type { Permitted } from './_internal/mod.ts';
import type { BannedTypes } from './banned_types.ts';

export type Permit<
  Type extends keyof BannedTypes,
  Reason extends string,
> = Permitted<Type, Reason>;
