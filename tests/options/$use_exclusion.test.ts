// deno-lint-ignore-file no-boolean-literal-for-arguments

import { describe, it } from '@std/testing/bdd';
import { assertType, type IsExact } from '@std/testing/types';

import type {
  $AsExcluded,
  $AsIncluded,
  $GetUseExclusion,
  $PickUseExclusion,
  $UseExclusion,
  $UseExclusionKey,
} from '@kz/type-utils/options';

describe('Option - Exclusion', () => {
  describe('$UseExclusionKey', () => {
    it('should be "$$use_exclusion"', () => {
      type Expected = '$$use_exclusion';
      type Actual = $UseExclusionKey;

      assertType<IsExact<Actual, Expected>>(true);
    });
  });

  describe('$UseExclusion', () => {
    it('should create an option with the correct key and value', () => {
      type ExcludedOption = $UseExclusion<true>;
      type IncludedOption = $UseExclusion<false>;

      type ExpectedExcluded = {
        '$$use_exclusion': true;
      };

      type ExpectedIncluded = {
        '$$use_exclusion': false;
      };

      assertType<IsExact<ExcludedOption, ExpectedExcluded>>(true);
      assertType<IsExact<IncludedOption, ExpectedIncluded>>(true);
    });
  });

  describe('$AsExcluded', () => {
    it('should be equivalent to $UseExclusion<true>', () => {
      type Expected = $UseExclusion<true>;
      type Actual = $AsExcluded;

      assertType<IsExact<Actual, Expected>>(true);
    });
  });

  describe('$AsIncluded', () => {
    it('should be equivalent to $UseExclusion<false>', () => {
      type Expected = $UseExclusion<false>;
      type Actual = $AsIncluded;

      assertType<IsExact<Actual, Expected>>(true);
    });
  });

  describe('$GetUseExclusion', () => {
    it('should retrieve the exclusion option value from the options object', () => {
      type Options = {
        '$$use_exclusion': true;
        '$$other_option': number;
      };

      type Result = $GetUseExclusion<Options>;

      assertType<IsExact<Result, true>>(true);
    });

    it('should return never if the exclusion option is not present', () => {
      type Options = {
        '$$other_option': number;
      };

      type Result = $GetUseExclusion<Options>;

      assertType<IsExact<Result, never>>(true);
    });
  });

  describe('$PickUseExclusion', () => {
    it('should pick the exclusion option from the options object', () => {
      type Options = {
        '$$use_exclusion': false;
        '$$other_option': string;
      };

      type Result = $PickUseExclusion<Options>;

      type Expected = {
        '$$use_exclusion': false;
      };

      assertType<IsExact<Result, Expected>>(true);
    });

    it('should return an empty object if the exclusion option is not present', () => {
      type Options = {
        '$$other_option': string;
      };

      type Result = $PickUseExclusion<Options>;

      assertType<IsExact<Result, Record<never, never>>>(true);
    });
  });
});
