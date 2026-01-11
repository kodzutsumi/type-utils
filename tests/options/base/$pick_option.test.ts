// deno-lint-ignore-file no-boolean-literal-for-arguments

import { describe, it } from '@std/testing/bdd';
import { assertType, type IsExact } from '@std/testing/types';

import type { $PickOption } from '@kz/type-utils/options';

describe('Base - $PickOption', () => {
  it('should return a keyed subset of the original object', () => {
    type Options = {
      $$optionA: string;
      $$optionB: number;
    };

    type Result = $PickOption<Options, '$$optionA', number>;

    assertType<IsExact<Result, { $$optionA: string }>>(true);
  });

  it('should return the default type for a non-existent key', () => {
    type Options = {
      $$optionA: string;
      $$optionB: number;
    };

    type Result = $PickOption<Options, '$$optionC', number>;

    assertType<IsExact<Result, { '$$optionC': number }>>(true);
  });
});
