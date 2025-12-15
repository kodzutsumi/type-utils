// Copyright 2020 - present integereleven. All rights reserved. MIT license.

import type { $FlipOptions } from './$flip_options.ts';
import type { $MergeOptions } from './$merge_options.ts';

import type { $UseAsync, $UseAsyncKey } from '../$use_async.ts';
import type { $UseInversion, $UseInversionKey } from '../$use_inversion.ts';
import type { $UseSetter, $UseSetterKey } from '../$use_setter.ts';
import type { $UseDirection, $UseDirectionKey } from '../$use_direction.ts';
import type { $UseExclusion, $UseExclusionKey } from '../$use_exclusion.ts';
import type { $UseImmutable, $UseImmutableKey } from '../$use_immutable.ts';
import type { $UseRequired, $UseRequiredKey } from '../$use_required.ts';
import type { $UseSafe, $UseSafeKey } from '../$use_safe.ts';
import type { $UseStrict, $UseStrictKey } from '../$use_strict.ts';

export type $ResolveOptions<Defaults, $Options = Defaults> =
  $MergeOptions<Defaults, $Options> extends infer $Merged
    ? $Merged extends { '$$inverted': true }
      ? InnerResolveOptions<$FlipOptions<Omit<$Merged, '$$inverted'>>>
    : InnerResolveOptions<Omit<$Merged, '$$inverted'>>
    : InnerResolveOptions<$Options>;

type InnerResolveOptions<Options> = Options extends $UseInversion<infer Setting>
  // $UseInversion
  ?
    & $UseInversion<Setting>
    & InnerResolveOptions<Omit<Options, $UseInversionKey>>
  // $UseAsync
  : Options extends $UseAsync<infer Setting>
    ? $UseAsync<Setting> & InnerResolveOptions<Omit<Options, $UseAsyncKey>>
  // $UseCollection
  // $UseCondition
  // $UseDefault
  // $UseDepth
  // $UseDirection
  : Options extends $UseDirection<infer Setting>
    ? $UseDirection<Setting> & InnerResolveOptions<Omit<Options, $UseDirectionKey>>
  // $UseElse
  // $UseExclusion
  : Options extends $UseExclusion<infer Setting>
    ? $UseExclusion<Setting> & InnerResolveOptions<Omit<Options, $UseExclusionKey>>
  // $UseFilter
  // $UseIdentMap
  // $UseIdents
  // $UseImmutable
  : Options extends $UseImmutable<infer Setting>
    ? $UseImmutable<Setting> & InnerResolveOptions<Omit<Options, $UseImmutableKey>>
  // $UseIndices
  // $UseKeys
  // $UsePaths
  // $UseRequired
  : Options extends $UseRequired<infer Setting>
    ? $UseRequired<Setting> & InnerResolveOptions<Omit<Options, $UseRequiredKey>>
  // $UseSafe
  : Options extends $UseSafe<infer Setting>
    ? $UseSafe<Setting> & InnerResolveOptions<Omit<Options, $UseSafeKey>>
  // $UseSetter
  : Options extends $UseSetter<infer Setting>
    ? $UseSetter<Setting> & InnerResolveOptions<Omit<Options, $UseSetterKey>>
  // $UseStrict
  : Options extends $UseStrict<infer Setting>
    ? $UseStrict<Setting> & InnerResolveOptions<Omit<Options, $UseStrictKey>>
  // $UseThen
  // default
  : Options;
