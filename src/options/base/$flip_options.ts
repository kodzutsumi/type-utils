// Copyright 2020 - present integereleven. All rights reserved. MIT license.

import type { $UseAsync, $UseAsyncKey } from '../$use_async.ts';
import type { $UseDirection, $UseDirectionKey } from '../$use_direction.ts';
import type { $UseElse, $UseElseKey } from '../$use_else.ts';
import type { $UseExclusion, $UseExclusionKey } from '../$use_exclusion.ts';
import type { $UseFilter, $UseFilterKey } from '../$use_filter.ts';
import type { $UseImmutable, $UseImmutableKey } from '../$use_immutable.ts';
import type { $UseInversion, $UseInversionKey } from '../$use_inversion.ts';
import type { $UseRequired, $UseRequiredKey } from '../$use_required.ts';
import type { $UseSafe, $UseSafeKey } from '../$use_safe.ts';
import type { $UseSetter, $UseSetterKey } from '../$use_setter.ts';
import type { $UseStrict, $UseStrictKey } from '../$use_strict.ts';
import type { $UseThen, $UseThenKey } from '../$use_then.ts';
import type { $Options } from './$options.ts';

export type $FlipOptions<Options extends $Options> = Options extends // $UseInversion
$UseInversion<infer Value> ?
    & (Value extends true ? $UseInversion<false> : $UseInversion<true>)
    & $FlipOptions<Omit<Options, $UseInversionKey>>
  // $UseAsync
  : Options extends $UseAsync<infer Value> ?
      & (Value extends true ? $UseAsync<false> : $UseAsync<true>)
      & $FlipOptions<Omit<Options, $UseAsyncKey>>
  // $UseDirection
  : Options extends $UseDirection<infer Value> ?
      & (Value extends true ? $UseDirection<false> : $UseDirection<true>)
      & $FlipOptions<Omit<Options, $UseDirectionKey>>
  // $UseElse
  : Options extends $UseElse<infer Value> ?
      & $UseThen<Value>
      & $FlipOptions<Omit<Options, $UseElseKey>>
  // $UseExclusion
  : Options extends $UseExclusion<infer Value> ?
      & (Value extends true ? $UseExclusion<false> : $UseExclusion<true>)
      & $FlipOptions<Omit<Options, $UseExclusionKey>>
  // $UseFilter
  : Options extends $UseFilter<infer Value> ?
      & (Value extends true ? $UseFilter<false> : $UseFilter<true>)
      & $FlipOptions<Omit<Options, $UseFilterKey>>
  // $UseImmutable
  : Options extends $UseImmutable<infer Value> ?
      & (Value extends true ? $UseImmutable<false> : $UseImmutable<true>)
      & $FlipOptions<Omit<Options, $UseImmutableKey>>
  // $UseRequired
  : Options extends $UseRequired<infer Value> ?
      & (Value extends true ? $UseRequired<false> : $UseRequired<true>)
      & $FlipOptions<Omit<Options, $UseRequiredKey>>
  // $UseSafe
  : Options extends $UseSafe<infer Value> ?
      & (Value extends true ? $UseSafe<false> : $UseSafe<true>)
      & $FlipOptions<Omit<Options, $UseSafeKey>>
  // $UseSetter
  : Options extends $UseSetter<infer Value> ?
      & (Value extends true ? $UseSetter<false> : $UseSetter<true>)
      & $FlipOptions<Omit<Options, $UseSetterKey>>
  // $UseStrict
  : Options extends $UseStrict<infer Value> ?
      & (Value extends true ? $UseStrict<false> : $UseStrict<true>)
      & $FlipOptions<Omit<Options, $UseStrictKey>>
  // $UseThen
  : Options extends $UseThen<infer Value> ?
      & $UseElse<Value>
      & $FlipOptions<Omit<Options, $UseThenKey>>
  // default
  : Options;
