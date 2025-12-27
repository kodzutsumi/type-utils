// deno-lint-ignore-file no-boolean-literal-for-arguments

import { describe, it } from '@std/testing/bdd';
import { assertType, type IsExact } from '@std/testing/types';

import type {
  $AsSafe,
  $AsUnsafe,
  $GetUseSafe,
  $PickUseSafe,
  $UseSafe,
  $UseSafeKey,
} from '@kz/type-utils/options';

describe('Option - Safe', () => {
  describe('directive', () => {
    describe('$UseSafeKey', () => {
      it('should be "$$use_safe"', () => {
        type Expected = '$$use_safe';
        type Actual = $UseSafeKey;

        assertType<IsExact<Actual, Expected>>(true);
      });
    });

    describe('$UseSafe', () => {
      it('should create an option with the correct key and value', () => {
        type SafeOption = $UseSafe<true>;
        type UnsafeOption = $UseSafe<false>;

        type ExpectedSafe = {
          '$$use_safe': true;
        };

        type ExpectedUnsafe = {
          '$$use_safe': false;
        };

        assertType<IsExact<SafeOption, ExpectedSafe>>(true);
        assertType<IsExact<UnsafeOption, ExpectedUnsafe>>(true);
      });
    });
  });

  describe('attributes', () => {
    describe('$AsSafe', () => {
      it('should be equivalent to $UseSafe<true>', () => {
        type Expected = $UseSafe<true>;
        type Actual = $AsSafe;

        assertType<IsExact<Actual, Expected>>(true);
      });
    });

    describe('$AsUnsafe', () => {
      it('should be equivalent to $UseSafe<false>', () => {
        type Expected = $UseSafe<false>;
        type Actual = $AsUnsafe;

        assertType<IsExact<Actual, Expected>>(true);
      });
    });
  });

  describe('utilities', () => {
    describe('$GetUseSafe', () => {
      it('should retrieve the safe option value from the options object', () => {
        type Options = {
          '$$use_safe': true;
          '$$other_option': number;
        };

        type Result = $GetUseSafe<Options>;

        assertType<IsExact<Result, true>>(true);
      });

      it('should return never if the safe option is not present', () => {
        type Options = {
          '$$other_option': number;
        };

        type Result = $GetUseSafe<Options>;

        assertType<IsExact<Result, never>>(true);
      });
    });

    describe('$PickUseSafe', () => {
      it('should pick the safe option from the options object', () => {
        type Options = {
          '$$use_safe': false;
          '$$other_option': string;
        };

        type Result = $PickUseSafe<Options>;

        type Expected = {
          '$$use_safe': false;
        };

        assertType<IsExact<Result, Expected>>(true);
      });

      it('should return an empty object if the safe option is not present', () => {
        type Options = {
          '$$other_option': string;
        };

        type Result = $PickUseSafe<Options>;

        assertType<IsExact<Result, Record<never, never>>>(true);
      });
    });
  });
});
