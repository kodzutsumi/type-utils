// Copyright 2020 - present integereleven. All rights reserved. MIT license.

import type { $Else, $GetUseElse, $UseElse } from './$use_else.ts';
import type { $GetUseThen, $Then, $UseThen } from './$use_then.ts';
import type { $GetOption, $PickOption } from './base/mod.ts';

const Key = '$$use_depth' as const;

export type $UseDepthKey = typeof Key;

type Depths = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

type DepthMeter = [null, false, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

export type $UseDepth<Depth extends boolean | Depths = boolean | Depths> = {
  [K in $UseDepthKey]: Depth;
};

export type $Depth<Depth extends boolean | Depths = boolean | Depths> =
  $UseDepth<Depth>;

export type $AsLevel<Depth extends Depths> = $Depth<Depth>;

export type $AsDeep = $Depth<true>;

export type $AsShallow = $Depth<false>;

export type $DecrementDepth<$Options> = $Options extends $UseDepth
  ? $Options extends { [Key]: infer Depth } ? Depth extends Depths ?
        & { [Key]: Depth extends 1 ? false : DepthMeter[Depth] }
        & Omit<$Options, $UseDepthKey>
    : Depth extends true ? { [Key]: 9 } & Omit<$Options, $UseDepthKey>
    : { [Key]: false } & Omit<$Options, $UseDepthKey>
  : { [Key]: false } & Omit<$Options, $UseDepthKey>
  : $Options;

export type $GetUseDepth<
  Options extends Record<string, unknown>,
  Default extends boolean = false,
> = $GetOption<Options, $UseDepthKey, Default>;

export type $PickUseDepth<
  Options extends Record<string, unknown>,
  Default extends boolean = false,
> = $PickOption<Options, $UseDepthKey, Default>;

export type $IsDeep<
  $OptsObject,
  $Options extends $UseThen & $UseElse = $Then<true> & $Else<false>,
> = $OptsObject extends $AsDeep ? $GetUseThen<$Options>
  : $OptsObject extends $AsLevel<infer Depth>
    ? Depth extends Depths ? $GetUseThen<$Options>
    : $GetUseElse<$Options>
  : $GetUseElse<$Options>;
