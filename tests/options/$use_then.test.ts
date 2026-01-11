// deno-lint-ignore-file no-boolean-literal-for-arguments

import { describe, it } from '@std/testing/bdd';
import { assertType, type IsExact } from '@std/testing/types';

import type {
  $GetUseThen,
  $PickUseThen,
  $Then,
  $UseThen,
  $UseThenKey,
} from '@kz/type-utils/options';

describe('Option - Then', () => {
  describe('directive', () => {
    describe('$UseThenKey', () => {
      it('should be "$$use_then"', () => {
        type Expected = '$$use_then';
        type Actual = $UseThenKey;

        assertType<IsExact<Actual, Expected>>(true);
      });
    });

    describe('$UseThen', () => {
      it('should create an option with the correct key and value', () => {
        type ThenOption = $UseThen<string>;

        type ExpectedDefault = {
          '$$use_then': string;
        };

        assertType<IsExact<ThenOption, ExpectedDefault>>(true);
      });
    });
  });

  describe('attributes', () => {
    describe('$Then', () => {
      it('should be equivalent to $UseThen<unknown>', () => {
        type Expected = $UseThen<unknown>;
        type Actual = $Then;

        assertType<IsExact<Actual, Expected>>(true);
      });
    });
  });

  describe('utilities', () => {
    describe('$GetUseThen', () => {
      it('should retrieve the then option value from the options object', () => {
        type Options = {
          '$$use_then': string;
          '$$other_option': number;
        };

        type Result = $GetUseThen<Options>;

        assertType<IsExact<Result, string>>(true);
      });

      it('should return true if the then option is not present', () => {
        type Options = {
          '$$other_option': number;
        };

        type Result = $GetUseThen<Options>;

        assertType<IsExact<Result, true>>(true);
      });
    });

    describe('$PickUseThen', () => {
      it('should pick the then option from the options object', () => {
        type Options = {
          '$$use_then': number;
          '$$other_option': string;
        };

        type Result = $PickUseThen<Options>;

        type Expected = {
          '$$use_then': number;
        };

        assertType<IsExact<Result, Expected>>(true);
      });

      it('should default to a $Then<true> object if the then option is not present', () => {
        type Options = {
          '$$other_option': string;
        };

        type Result = $PickUseThen<Options>;

        assertType<IsExact<Result, $Then<true>>>(true);
      });
    });
  });
});
