// deno-lint-ignore-file no-boolean-literal-for-arguments

import { describe, it } from '@std/testing/bdd';
import { assertType, type IsExact } from '@std/testing/types';

import type {
  $AsImmutable,
  $AsMutable,
  $GetUseImmutable,
  $PickUseImmutable,
  $UseImmutable,
  $UseImmutableKey,
} from '@kz/type-utils/options';

describe('Option - Immutable', () => {
  describe('$UseImmutableKey', () => {
    it('should be "$$use_immutable"', () => {
      type Expected = '$$use_immutable';
      type Actual = $UseImmutableKey;

      assertType<IsExact<Actual, Expected>>(true);
    });
  });

  describe('$UseImmutable', () => {
    it('should create an option with the correct key and value', () => {
      type ImmutableOption = $UseImmutable<true>;
      type MutableOption = $UseImmutable<false>;

      type ExpectedImmutable = {
        '$$use_immutable': true;
      };

      type ExpectedMutable = {
        '$$use_immutable': false;
      };

      assertType<IsExact<ImmutableOption, ExpectedImmutable>>(true);
      assertType<IsExact<MutableOption, ExpectedMutable>>(true);
    });
  });

  describe('$AsImmutable', () => {
    it('should be equivalent to $UseImmutable<true>', () => {
      type Expected = $UseImmutable<true>;
      type Actual = $AsImmutable;

      assertType<IsExact<Actual, Expected>>(true);
    });
  });

  describe('$AsMutable', () => {
    it('should be equivalent to $UseImmutable<false>', () => {
      type Expected = $UseImmutable<false>;
      type Actual = $AsMutable;

      assertType<IsExact<Actual, Expected>>(true);
    });
  });

  describe('$GetUseImmutable', () => {
    it('should retrieve the immutable option value from the options object', () => {
      type Options = {
        '$$use_immutable': true;
        '$$other_option': number;
      };

      type Result = $GetUseImmutable<Options>;

      assertType<IsExact<Result, true>>(true);
    });

    it('should return never if the immutable option is not present', () => {
      type Options = {
        '$$other_option': number;
      };

      type Result = $GetUseImmutable<Options>;

      assertType<IsExact<Result, never>>(true);
    });
  });

  describe('$PickUseImmutable', () => {
    it('should pick the immutable option from the options object', () => {
      type Options = {
        '$$use_immutable': false;
        '$$other_option': string;
      };

      type Result = $PickUseImmutable<Options>;

      type Expected = {
        '$$use_immutable': false;
      };

      assertType<IsExact<Result, Expected>>(true);
    });

    it('should return an empty object if the immutable option is not present', () => {
      type Options = {
        '$$other_option': string;
      };

      type Result = $PickUseImmutable<Options>;

      assertType<IsExact<Result, Record<never, never>>>(true);
    });
  });
});
