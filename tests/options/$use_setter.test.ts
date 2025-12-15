// deno-lint-ignore-file no-boolean-literal-for-arguments

import { describe, it } from '@std/testing/bdd';
import { assertType, type IsExact } from '@std/testing/types';

import type {
  $AsGetter,
  $AsSetter,
  $GetUseSetter,
  $PickUseSetter,
  $UseSetter,
  $UseSetterKey,
} from '@kz/type-utils/options';

describe('Option - Setter', () => {
  describe('$UseSetterKey', () => {
    it('should be "$$use_setter"', () => {
      type Expected = '$$use_setter';
      type Actual = $UseSetterKey;
      assertType<IsExact<Actual, Expected>>(true);
    });
  });

  describe('$UseSetter', () => {
    it('should create an option with the correct key and value', () => {
      type SetterOption = $UseSetter<true>;
      type GetterOption = $UseSetter<false>;

      type ExpectedSetter = {
        '$$use_setter': true;
      };

      type ExpectedGetter = {
        '$$use_setter': false;
      };

      assertType<IsExact<SetterOption, ExpectedSetter>>(true);
      assertType<IsExact<GetterOption, ExpectedGetter>>(true);
    });
  });

  describe('$AsInverted', () => {
    it('should be equivalent to $UseSetter<true>', () => {
      type Expected = $UseSetter<true>;
      type Actual = $AsSetter;

      assertType<IsExact<Actual, Expected>>(true);
    });
  });

  describe('$AsUpright', () => {
    it('should be equivalent to $UseSetter<false>', () => {
      type Expected = $UseSetter<false>;
      type Actual = $AsGetter;

      assertType<IsExact<Actual, Expected>>(true);
    });
  });

  describe('$GetUseSetter', () => {
    it('should retrieve the Setter option value from the options object', () => {
      type Options = {
        '$$use_setter': true;
        '$$other_option': number;
      };

      type Result = $GetUseSetter<Options>;

      assertType<IsExact<Result, true>>(true);
    });

    it('should return never if the Setter option is not present', () => {
      type Options = {
        '$$other_option': number;
      };

      type Result = $GetUseSetter<Options>;

      assertType<IsExact<Result, never>>(true);
    });
  });

  describe('$PickUseSetter', () => {
    it('should pick the Setter option from the options object', () => {
      type Options = {
        '$$use_setter': false;
        '$$other_option': string;
      };

      type Result = $PickUseSetter<Options>;

      type Expected = {
        '$$use_setter': false;
      };

      assertType<IsExact<Result, Expected>>(true);
    });

    it('should return an empty object if the Setter option is not present', () => {
      type Options = {
        '$$other_option': string;
      };

      type Result = $PickUseSetter<Options>;

      assertType<IsExact<Result, Record<never, never>>>(true);
    });
  });
});
