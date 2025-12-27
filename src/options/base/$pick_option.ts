// Copyright 2020 - present integereleven. All rights reserved. MIT license.

import type { $OptionKey } from './$option_key.ts';
import type { $Options } from './$options.ts';

export type $PickOption<Key extends $OptionKey, Options extends $Options> =
  Key extends keyof Options ? { [K in Key]: Options[K] } : Record<never, never>;
