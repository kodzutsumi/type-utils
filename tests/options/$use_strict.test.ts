// deno-lint-ignore-file no-boolean-literal-for-arguments

import { describe, it } from '@std/testing/bdd';
import { assertType, type IsExact } from '@std/testing/types';

import type {
  $AsStrict,
  $AsLoose,
  $GetUseStrict,
  $PickUseStrict,
  $UseStrict,
  $UseStrictKey,
} from '@kz/type-utils/options';

describe('Option - Strict', () => {
  describe('$UseStrictKey', () => {
    it('should be "$$use_strict"', () => {
      type Expected = '$$use_strict';
      type Actual = $UseStrictKey;

      assertType<IsExact<Actual, Expected>>(true);
    });
  });

  describe('$UseStrict', () => {
    it('should create an option with the correct key and value', () => {
      type StrictOption = $UseStrict<true>;
      type LooseOption = $UseStrict<false>;

      type ExpectedStrict = {
        '$$use_strict': true;
      };

      type ExpectedLoose = {
        '$$use_strict': false;
      };

      assertType<IsExact<StrictOption, ExpectedStrict>>(true);
      assertType<IsExact<LooseOption, ExpectedLoose>>(true);
    });
  });

  describe('$AsStrict', () => {
    it('should be equivalent to $UseStrict<true>', () => {
      type Expected = $UseStrict<true>;
      type Actual = $AsStrict;

      assertType<IsExact<Actual, Expected>>(true);
    });
  });

  describe('$AsLoose', () => {
    it('should be equivalent to $UseStrict<false>', () => {
      type Expected = $UseStrict<false>;
      type Actual = $AsLoose;

      assertType<IsExact<Actual, Expected>>(true);
    });
  });

  describe('$GetUseStrict', () => {
    it('should retrieve the strict option value from the options object', () => {
      type Options = {
        '$$use_strict': true;
        '$$other_option': number;
      };

      type Result = $GetUseStrict<Options>;

      assertType<IsExact<Result, true>>(true);
    });

    it('should return never if the strict option is not present', () => {
      type Options = {
        '$$other_option': number;
      };

      type Result = $GetUseStrict<Options>;

      assertType<IsExact<Result, never>>(true);
    });
  });

  describe('$PickUseStrict', () => {
    it('should pick the strict option from the options object', () => {
      type Options = {
        '$$use_strict': false;
        '$$other_option': string;
      };

      type Result = $PickUseStrict<Options>;

      type Expected = {
        '$$use_strict': false;
      };

      assertType<IsExact<Result, Expected>>(true);
    });

    it('should return an empty object if the strict option is not present', () => {
      type Options = {
        '$$other_option': string;
      };

      type Result = $PickUseStrict<Options>;

      assertType<IsExact<Result, Record<never, never>>>(true);
    });
  });
});
