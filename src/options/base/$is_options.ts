// Copyright 2020 - present integereleven. All rights reserved. MIT license.

import type { $OptionKey } from './$option_key.ts';

export type $IsOptions<T> = T extends Record<infer K, unknown>
  ? K extends $OptionKey ? true : false
  : false;
