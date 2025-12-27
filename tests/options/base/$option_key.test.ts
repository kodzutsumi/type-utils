// deno-lint-ignore-file no-boolean-literal-for-arguments

import { describe, it } from '@std/testing/bdd';
import { assertType, type Has } from '@std/testing/types';

import type { $OptionKey } from '@kz/type-utils/options';

describe('Base - $OptionKey', () => {
  it('should be a key with a specific pattern', () => {
    type Valid = '$$optionA';

    assertType<Has<Valid, $OptionKey>>(true);
  });

  it('should be invalid', () => {
    type Invalid = '$optionA';

    assertType<Has<Invalid, $OptionKey>>(false);
  });
});
