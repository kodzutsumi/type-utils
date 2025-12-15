// deno-lint-ignore-file no-boolean-literal-for-arguments

import { describe, it } from '@std/testing/bdd';
import { assertType, type Has } from '@std/testing/types';

import type { $Options } from '@kz/type-utils/options';

describe('$Options', () => {
  it('should be an object with specific key pattern', () => {
    type Valid = {
      $$optionA: string;
      $$optionB: number;
    };

    assertType<Has<Valid, $Options>>(true);
  });
});
