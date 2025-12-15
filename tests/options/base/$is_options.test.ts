// deno-lint-ignore-file no-boolean-literal-for-arguments

import { describe, it } from '@std/testing/bdd';
import { assertType } from '@std/testing/types';

import type { $IsOptions } from '@kz/type-utils/options';

describe('$IsOptions', () => {
  it('should return true', () => {
    type Valid = {
      $$optionA: string;
      $$optionB: number;
    };

    assertType<$IsOptions<Valid>>(true);
  });

  it('should return false', () => {
    type Invalid = {
      optionA: string;
      optionB: number;
      $$optionC: boolean;
    };

    assertType<$IsOptions<Invalid>>(false);
  });
});
