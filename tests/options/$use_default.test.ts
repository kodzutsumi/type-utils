// deno-lint-ignore-file no-boolean-literal-for-arguments

import { describe, it } from '@std/testing/bdd';
import { assertType, type IsExact } from '@std/testing/types';

import type {
  $DefaultTo,
  $GetUseDefault,
  $PickUseDefault,
  $UseDefault,
  $UseDefaultKey,
} from '@kz/type-utils/options';

describe('Option - Default', () => {
  describe('directive', () => {
    describe('$UseDefaultKey', () => {
      it('should be "$$use_default"', () => {
        type Expected = '$$use_default';
        type Actual = $UseDefaultKey;

        assertType<IsExact<Actual, Expected>>(true);
      });
    });

    describe('$UseDefault', () => {
      it('should create an option with the correct key and value', () => {
        type DefaultOption = $UseDefault<string>;

        type ExpectedDefault = {
          '$$use_default': string;
        };

        assertType<IsExact<DefaultOption, ExpectedDefault>>(true);
      });
    });
  });

  describe('attributes', () => {
    describe('$DefaultTo', () => {
      it('should be equivalent to $UseDefault<unknown>', () => {
        type Expected = $UseDefault<unknown>;
        type Actual = $DefaultTo;

        assertType<IsExact<Actual, Expected>>(true);
      });
    });
  });

  describe('utilities', () => {
    describe('$GetUseDefault', () => {
      it('should retrieve the default option value from the options object', () => {
        type Options = {
          '$$use_default': string;
          '$$other_option': number;
        };

        type Result = $GetUseDefault<Options>;

        assertType<IsExact<Result, string>>(true);
      });

      it('should return never if the default option is not present', () => {
        type Options = {
          '$$other_option': number;
        };

        type Result = $GetUseDefault<Options>;

        assertType<IsExact<Result, never>>(true);
      });
    });

    describe('$PickUseDefault', () => {
      it('should pick the default option from the options object', () => {
        type Options = {
          '$$use_default': number;
          '$$other_option': string;
        };

        type Result = $PickUseDefault<Options>;

        type Expected = {
          '$$use_default': number;
        };

        assertType<IsExact<Result, Expected>>(true);
      });

      it('should return an empty object if the default option is not present', () => {
        type Options = {
          '$$other_option': string;
        };

        type Result = $PickUseDefault<Options>;

        assertType<IsExact<Result, Record<never, never>>>(true);
      });
    });
  });
});
