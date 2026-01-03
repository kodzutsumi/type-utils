// Copyright 2020 - present integereleven. All rights reserved. MIT license.

import type { $FlipOptions } from './$flip_options.ts';
import type { $MergeOptions } from './$merge_options.ts';

import type {
  $AsInverted,
  $UseInversionKey,
} from '../$use_inversion.ts';

export type $ResolveOptions<Defaults, $Options = Defaults> =
  $MergeOptions<Defaults, $Options> extends infer $Merged
    ? $Merged extends $AsInverted
      ? $FlipOptions<Omit<$Merged, $UseInversionKey>>
    : Omit<$Merged, $UseInversionKey>
    : $Options extends $AsInverted
      ? $FlipOptions<Omit<$Options, $UseInversionKey>>
    : Omit<$Options, $UseInversionKey>;
