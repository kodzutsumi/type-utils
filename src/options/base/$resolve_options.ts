// Copyright 2020 - present integereleven. All rights reserved. MIT license.

import type { $UseAsync, $UseAsyncKey } from '../$use_async.ts';
import type { $UseCollection, $UseCollectionKey } from '../$use_collection.ts';
import type { $UseDefault, $UseDefaultKey } from '../$use_default.ts';
import type { $UseDepth, $UseDepthKey } from '../$use_depth.ts';
import type { $UseDirection, $UseDirectionKey } from '../$use_direction.ts';
import type { $Else, $UseElseKey } from '../$use_else.ts';
import type { $UseExclusion, $UseExclusionKey } from '../$use_exclusion.ts';
import type { $UseFilter, $UseFilterKey } from '../$use_filter.ts';
import type {
  $UseIdents,
  $UseIdentsKey,
  $UseIdentsTypeKey,
} from '../$use_idents.ts';
import type { $UseImmutable, $UseImmutableKey } from '../$use_immutable.ts';
import type { $AsInverted, $UseInversionKey } from '../$use_inversion.ts';
import type { $UseRequired, $UseRequiredKey } from '../$use_required.ts';
import type { $UseSetter, $UseSetterKey } from '../$use_setter.ts';
import type { $UseStrict, $UseStrictKey } from '../$use_strict.ts';
import type { $Then, $UseThenKey } from '../$use_then.ts';
import type { $FlipOptions } from './$flip_options.ts';
import type { $MergeOptions } from './$merge_options.ts';

export type $ResolveOptions<Defaults, $Options = Defaults> =
  $MergeOptions<Defaults, $Options> extends infer $Resolved
    ? $Resolved extends $AsInverted
      ? InnerResolveOptions<$FlipOptions<Omit<$Resolved, $UseInversionKey>>>
    : InnerResolveOptions<Omit<$Resolved, $UseInversionKey>>
    : InnerResolveOptions<Omit<$Options, $UseInversionKey>>;

type InnerResolveOptions<$Options> = $Options extends $UseAsync<infer Setting>
  ? $UseAsync<Setting> & InnerResolveOptions<Omit<$Options, $UseAsyncKey>>
  : $Options extends $UseCollection<infer Setting> ?
      & $UseCollection<Setting>
      & InnerResolveOptions<Omit<$Options, $UseCollectionKey>>
  : $Options extends $Then<infer Setting>
    ? $Then<Setting> & InnerResolveOptions<Omit<$Options, $UseThenKey>>
  : $Options extends $Else<infer Setting>
    ? $Else<Setting> & InnerResolveOptions<Omit<$Options, $UseElseKey>>
  : $Options extends $UseDefault<infer Setting> ?
      & $UseDefault<Setting>
      & InnerResolveOptions<Omit<$Options, $UseDefaultKey>>
  : $Options extends $UseDepth<infer Setting>
    ? $UseDepth<Setting> & InnerResolveOptions<Omit<$Options, $UseDepthKey>>
  : $Options extends $UseDirection<infer Setting> ?
      & $UseDirection<Setting>
      & InnerResolveOptions<Omit<$Options, $UseDirectionKey>>
  : $Options extends $UseExclusion<infer Setting> ?
      & $UseExclusion<Setting>
      & InnerResolveOptions<Omit<$Options, $UseExclusionKey>>
  : $Options extends $UseFilter<infer Setting>
    ? $UseFilter<Setting> & InnerResolveOptions<Omit<$Options, $UseFilterKey>>
  : $Options extends $UseIdents<infer Type, infer Setting> ?
      & $UseIdents<Type, Setting>
      & InnerResolveOptions<Omit<$Options, $UseIdentsKey | $UseIdentsTypeKey>>
  : $Options extends $UseImmutable<infer Setting> ?
      & $UseImmutable<Setting>
      & InnerResolveOptions<Omit<$Options, $UseImmutableKey>>
  : $Options extends $UseRequired<infer Setting> ?
      & $UseRequired<Setting>
      & InnerResolveOptions<Omit<$Options, $UseRequiredKey>>
  : $Options extends $UseSetter<infer Setting>
    ? $UseSetter<Setting> & InnerResolveOptions<Omit<$Options, $UseSetterKey>>
  : $Options extends $UseStrict<infer Setting>
    ? $UseStrict<Setting> & InnerResolveOptions<Omit<$Options, $UseStrictKey>>
  : $Options;
