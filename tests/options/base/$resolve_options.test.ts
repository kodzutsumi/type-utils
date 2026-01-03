// deno-lint-ignore-file no-boolean-literal-for-arguments

import { describe, it } from '@std/testing/bdd';
import { assertType, type IsExact } from '@std/testing/types';

import type {
  $AsAsync,
  $AsInverted,
  $AsLoose,
  $AsStrict,
  $AsSync,
  $AsUpright,
  $ResolveOptions,
  $Then,
  $Else,
} from '@kz/type-utils/options';

describe('Base - $ResolveOptions', () => {
  it('should resolve options, merging sets together', () => {
    type $Defaults = $AsSync & $AsStrict;

    type $Options = $AsAsync;

    type $Resolved = $ResolveOptions<$Defaults, $Options>;

    type $ExpectedResolved = $AsAsync & $AsStrict;

    assertType<IsExact<$Resolved, $ExpectedResolved>>(true);
  });

  it('should invert options', () => {
    type $Defaults = $AsSync & $AsStrict & $AsUpright;

    type $Options = $AsAsync & $AsInverted;

    type $Resolved = $ResolveOptions<$Defaults, $Options>;

    type $ExpectedResolved = $AsSync & $AsLoose;

    assertType<IsExact<$Resolved, $ExpectedResolved>>(true);
  });

  it('should invert $Then/$Else options', () => {
    type $Defaults = $Then<string> & $Else<number> & $AsInverted;
    type $Options = $Then<boolean>;
    type $Resolved = $ResolveOptions<$Defaults, $Options>;

    assertType<IsExact<$Resolved, $Then<number> & $Else<boolean>>>(true);
  });
});
