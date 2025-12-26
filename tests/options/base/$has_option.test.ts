// deno-lint-ignore-file no-boolean-literal-for-arguments

import { describe, it } from '@std/testing/bdd';
import { assertType, type IsExact } from '@std/testing/types';

import type { $HasOption } from '@kz/type-utils/options';

describe('Base - $HasOption', () => {
  it('should return true', () => {
    type Options = {
      $$optionA: string;
      $$optionB: number;
    };

    type Result = $HasOption<'$$optionA', Options>;

    assertType<IsExact<Result, true>>(true);
  });

  it('should return never', () => {
    type Options = {
      $$optionA: string;
      $$optionB: number;
    };

    type Result = $HasOption<'$$optionC', Options>;

    assertType<IsExact<Result, false>>(true);
  });
});
