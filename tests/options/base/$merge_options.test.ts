// deno-lint-ignore-file no-boolean-literal-for-arguments

import { describe, it } from '@std/testing/bdd';
import { assertType, type IsExact } from '@std/testing/types';

import type {
  $AsAsync,
  $AsRequired,
  $AsStrict,
  $MergeOptions,
} from '@kz/type-utils/options';

describe('Base - $MergeOptions', () => {
  it('should merge the keys of set 2 that are present in set 1', () => {
    type $OptionsA = $AsAsync & $AsStrict;
    type $OptionsB = $AsStrict & $AsRequired;

    type $MergedOptions = $MergeOptions<$OptionsA, $OptionsB>;

    type $ExpectedMergedOptions = $AsAsync & $AsStrict;

    assertType<IsExact<$MergedOptions, $ExpectedMergedOptions>>(true);
  });
});
