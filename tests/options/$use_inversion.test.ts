// deno-lint-ignore-file no-boolean-literal-for-arguments

import { describe, it } from '@std/testing/bdd';
import { assertType, type IsExact } from '@std/testing/types';

import type {
  $AsInverted,
  $AsUpright,
  $GetUseInversion,
  $PickUseInversion,
  $UseInversion,
  $UseInversionKey,
} from '@kz/type-utils/options';

describe('Option - Inversion', () => {
  describe('directive', () => {
    describe('$UseInversionKey', () => {
      it('should be "$$use_inversion"', () => {
        type Expected = '$$use_inversion';
        type Actual = $UseInversionKey;

        assertType<IsExact<Actual, Expected>>(true);
      });
    });

    describe('$UseInversion', () => {
      it('should create an option with the correct key and value', () => {
        type InversionOption = $UseInversion<true>;
        type UprightOption = $UseInversion<false>;

        type ExpectedInversion = {
          '$$use_inversion': true;
        };

        type ExpectedUpright = {
          '$$use_inversion': false;
        };

        assertType<IsExact<InversionOption, ExpectedInversion>>(true);
        assertType<IsExact<UprightOption, ExpectedUpright>>(true);
      });
    });
  });

  describe('attributes', () => {
    describe('$AsInverted', () => {
      it('should be equivalent to $UseInversion<true>', () => {
        type Expected = $UseInversion<true>;
        type Actual = $AsInverted;

        assertType<IsExact<Actual, Expected>>(true);
      });
    });

    describe('$AsUpright', () => {
      it('should be equivalent to $UseInversion<false>', () => {
        type Expected = $UseInversion<false>;
        type Actual = $AsUpright;

        assertType<IsExact<Actual, Expected>>(true);
      });
    });
  });

  describe('utilities', () => {
    describe('$GetUseInversion', () => {
      it('should retrieve the inversion option value from the options object', () => {
        type Options = {
          '$$use_inversion': true;
          '$$other_option': number;
        };

        type Result = $GetUseInversion<Options>;

        assertType<IsExact<Result, true>>(true);
      });

      it('should return never if the inversion option is not present', () => {
        type Options = {
          '$$other_option': number;
        };

        type Result = $GetUseInversion<Options>;

        assertType<IsExact<Result, never>>(true);
      });
    });

    describe('$PickUseInversion', () => {
      it('should pick the inversion option from the options object', () => {
        type Options = {
          '$$use_inversion': false;
          '$$other_option': string;
        };

        type Result = $PickUseInversion<Options>;

        type Expected = {
          '$$use_inversion': false;
        };

        assertType<IsExact<Result, Expected>>(true);
      });

      it('should return an empty object if the inversion option is not present', () => {
        type Options = {
          '$$other_option': string;
        };

        type Result = $PickUseInversion<Options>;

        assertType<IsExact<Result, Record<never, never>>>(true);
      });
    });
  });
});
