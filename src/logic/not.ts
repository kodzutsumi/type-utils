// Copyright 2020 - present integereleven. All rights reserved. MIT license.

import type {
  $Else,
  $FlipOptions,
  $ResolveOptions,
  $Then,
  $UseElse,
  $UseInversion,
  $UseThen,
} from '@kz/type-utils/options';

import type { If } from './if.ts';

type Defaults = $Then<true> & $Else<false>;

export type Not<
  Test extends boolean,
  $Options extends $UseThen | $UseElse | $UseInversion = Defaults,
> = $ResolveOptions<Defaults, $Options> extends
  infer $Resolved extends $UseThen | $UseElse ? If<
    Test,
    $FlipOptions<$Resolved>
  >
  : If<
    Test,
    $FlipOptions<$Options>
  >;
