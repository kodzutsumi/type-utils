// deno-lint-ignore-file no-boolean-literal-for-arguments

import { describe, it } from '@std/testing/bdd';
import { assertType, type IsExact } from '@std/testing/types';

import type { $PickOption } from '@kz/type-utils/options';

describe('$PickOption', () => {
  it('should return a keyed subset of the original object', () => {
    type Options = {
      $$optionA: string;
      $$optionB: number;
    };

    type Result = $PickOption<'$$optionA', Options>;

    assertType<IsExact<Result, { $$optionA: string }>>(true);
  });

  it('should return an empty object', () => {
    type Options = {
      $$optionA: string;
      $$optionB: number;
    };

    type Result = $PickOption<'$$optionC', Options>;

    assertType<IsExact<Result, Record<never, never>>>(true);
  });
});
