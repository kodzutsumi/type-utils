// deno-lint-ignore-file no-boolean-literal-for-arguments

import { describe, it } from '@std/testing/bdd';
import { assertType, type IsExact } from '@std/testing/types';

import type { $GetOption } from '@kz/type-utils/options';

describe('Base - $GetOption', () => {
  it('should return a type', () => {
    type Options = {
      $$optionA: string;
      $$optionB: number;
    };

    type Result = $GetOption<Options, '$$optionA', number>;

    assertType<IsExact<Result, string>>(true);
  });

  it('should return never', () => {
    type Options = {
      $$optionA: string;
      $$optionB: number;
    };

    type Result = $GetOption<Options, '$$optionC', string>;

    assertType<IsExact<Result, string>>(true);
  });
});
