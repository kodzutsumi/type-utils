// Copyright 2020 - present integereleven. All rights reserved. MIT license.

import type { $GetOption, $PickOption } from './base/mod.ts';

const Key = '$$use_collection' as const;

export type $UseCollectionKey = typeof Key;

export type $UseCollectionTarget = 'collection' | 'idents' | 'values';

export type $UseCollection<
  CollectionTarget extends $UseCollectionTarget = 'collection',
> = {
  [K in $UseCollectionKey]: CollectionTarget;
};

export type $Collect<Target extends $UseCollectionTarget = 'collection'> =
  $UseCollection<Target>;

export type $CollectAll = $UseCollection<'collection'>;

export type $CollectIdents = $UseCollection<'idents'>;

export type $CollectValues = $UseCollection<'values'>;

export type $GetUseCollection<
  Options extends Record<string, unknown>,
  Default extends $UseCollectionTarget = 'collection',
> = $GetOption<Options, $UseCollectionKey, Default>;

export type $PickUseCollection<
  Options extends Record<string, unknown>,
  Default extends $UseCollectionTarget = 'collection',
> = $PickOption<Options, $UseCollectionKey, Default>;
