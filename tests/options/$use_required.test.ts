// deno-lint-ignore-file no-boolean-literal-for-arguments

import { describe, it } from '@std/testing/bdd';
import { assertType, type IsExact } from '@std/testing/types';

import type {
  $AsRequired,
  $AsOptional,
  $GetUseRequired,
  $PickUseRequired,
  $UseRequired,
  $UseRequiredKey,
} from '@kz/type-utils/options';

describe('Option - Required', () => {
  describe('$UseRequiredKey', () => {
    it('should be "$$use_required"', () => {
      type Expected = '$$use_required';
      type Actual = $UseRequiredKey;

      assertType<IsExact<Actual, Expected>>(true);
    });
  });

  describe('$UseRequired', () => {
    it('should create an option with the correct key and value', () => {
      type RequiredOption = $UseRequired<true>;
      type OptionalOption = $UseRequired<false>;

      type ExpectedRequired = {
        '$$use_required': true;
      };

      type ExpectedOptional = {
        '$$use_required': false;
      };

      assertType<IsExact<RequiredOption, ExpectedRequired>>(true);
      assertType<IsExact<OptionalOption, ExpectedOptional>>(true);
    });
  });

  describe('$AsRequired', () => {
    it('should be equivalent to $UseRequired<true>', () => {
      type Expected = $UseRequired<true>;
      type Actual = $AsRequired;

      assertType<IsExact<Actual, Expected>>(true);
    });
  });

  describe('$AsOptional', () => {
    it('should be equivalent to $UseRequired<false>', () => {
      type Expected = $UseRequired<false>;
      type Actual = $AsOptional;

      assertType<IsExact<Actual, Expected>>(true);
    });
  });

  describe('$GetUseRequired', () => {
    it('should retrieve the required option value from the options object', () => {
      type Options = {
        '$$use_required': true;
        '$$other_option': number;
      };

      type Result = $GetUseRequired<Options>;

      assertType<IsExact<Result, true>>(true);
    });

    it('should return never if the required option is not present', () => {
      type Options = {
        '$$other_option': number;
      };

      type Result = $GetUseRequired<Options>;

      assertType<IsExact<Result, never>>(true);
    });
  });

  describe('$PickUseRequired', () => {
    it('should pick the required option from the options object', () => {
      type Options = {
        '$$use_required': false;
        '$$other_option': string;
      };

      type Result = $PickUseRequired<Options>;

      type Expected = {
        '$$use_required': false;
      };

      assertType<IsExact<Result, Expected>>(true);
    });

    it('should return an empty object if the required option is not present', () => {
      type Options = {
        '$$other_option': string;
      };

      type Result = $PickUseRequired<Options>;

      assertType<IsExact<Result, Record<never, never>>>(true);
    });
  });
});
