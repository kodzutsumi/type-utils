// deno-lint-ignore-file no-boolean-literal-for-arguments

import { describe, it } from '@std/testing/bdd';
import { assertType, type IsExact } from '@std/testing/types';

import type {
  $Else,
  $GetUseElse,
  $PickUseElse,
  $UseElse,
  $UseElseKey,
} from '@kz/type-utils/options';

describe('Option - Else', () => {
  describe('directive', () => {
    describe('$UseElseKey', () => {
      it('should be "$$use_else"', () => {
        type Expected = '$$use_else';
        type Actual = $UseElseKey;

        assertType<IsExact<Actual, Expected>>(true);
      });
    });

    describe('$UseElse', () => {
      it('should create an option with the correct key and value', () => {
        type ElseOption = $UseElse<string>;

        type ExpectedDefault = {
          '$$use_else': string;
        };

        assertType<IsExact<ElseOption, ExpectedDefault>>(true);
      });
    });
  });

  describe('attributes', () => {
    describe('$Else', () => {
      it('should be equivalent to $UseElse<unknown>', () => {
        type Expected = $UseElse<unknown>;
        type Actual = $Else;

        assertType<IsExact<Actual, Expected>>(true);
      });
    });
  });

  describe('utilities', () => {
    describe('$GetUseElse', () => {
      it('should retrieve the else option value from the options object', () => {
        type Options = {
          '$$use_else': string;
          '$$other_option': number;
        };

        type Result = $GetUseElse<Options>;

        assertType<IsExact<Result, string>>(true);
      });

      it('should return false if the else option is not present', () => {
        type Options = {
          '$$other_option': number;
        };

        type Result = $GetUseElse<Options>;

        assertType<IsExact<Result, false>>(true);
      });
    });

    describe('$PickUseElse', () => {
      it('should pick the else option from the options object', () => {
        type Options = {
          '$$use_else': number;
          '$$other_option': string;
        };

        type Result = $PickUseElse<Options>;

        type Expected = {
          '$$use_else': number;
        };

        assertType<IsExact<Result, Expected>>(true);
      });

      it('should default to $Else<false> if the else option is not present', () => {
        type Options = {
          '$$other_option': string;
        };

        type Result = $PickUseElse<Options>;

        assertType<IsExact<Result, $Else<false>>>(true);
      });
    });
  });
});
