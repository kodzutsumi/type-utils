// deno-lint-ignore-file no-boolean-literal-for-arguments

import { describe, it } from '@std/testing/bdd';
import { assertType, type IsExact } from '@std/testing/types';

import type {
  $AsFilter,
  $AsPredicate,
  $GetUseFilter,
  $PickUseFilter,
  $UseFilter,
  $UseFilterKey,
} from '@kz/type-utils/options';

describe('Option - Filter', () => {
  describe('directive', () => {
    describe('$UseFilterKey', () => {
      it('should be "$$use_filter"', () => {
        type Expected = '$$use_filter';
        type Actual = $UseFilterKey;

        assertType<IsExact<Actual, Expected>>(true);
      });
    });

    describe('$UseFilter', () => {
      it('should create an option with the correct key and value', () => {
        type FilterOption = $UseFilter<true>;
        type PredicateOption = $UseFilter<false>;

        type ExpectedFilter = {
          '$$use_filter': true;
        };

        type ExpectedPredicate = {
          '$$use_filter': false;
        };

        assertType<IsExact<FilterOption, ExpectedFilter>>(true);
        assertType<IsExact<PredicateOption, ExpectedPredicate>>(true);
      });
    });
  });

  describe('attributes', () => {
    describe('$AsFilter', () => {
      it('should be equivalent to $UseFilter<true>', () => {
        type Expected = $UseFilter<true>;
        type Actual = $AsFilter;

        assertType<IsExact<Actual, Expected>>(true);
      });
    });

    describe('$AsPredicate', () => {
      it('should be equivalent to $UseFilter<false>', () => {
        type Expected = $UseFilter<false>;
        type Actual = $AsPredicate;

        assertType<IsExact<Actual, Expected>>(true);
      });
    });
  });

  describe('utilities', () => {
    describe('$GetUseFilter', () => {
      it('should retrieve the filter option value from the options object', () => {
        type Options = {
          '$$use_filter': true;
          '$$other_option': number;
        };

        type Result = $GetUseFilter<Options>;

        assertType<IsExact<Result, true>>(true);
      });

      it('should return never if the filter option is not present', () => {
        type Options = {
          '$$other_option': number;
        };

        type Result = $GetUseFilter<Options>;

        assertType<IsExact<Result, never>>(true);
      });
    });

    describe('$PickUseFilter', () => {
      it('should pick the filter option from the options object', () => {
        type Options = {
          '$$use_filter': false;
          '$$other_option': string;
        };

        type Result = $PickUseFilter<Options>;

        type Expected = {
          '$$use_filter': false;
        };

        assertType<IsExact<Result, Expected>>(true);
      });

      it('should return an empty object if the filter option is not present', () => {
        type Options = {
          '$$other_option': string;
        };

        type Result = $PickUseFilter<Options>;

        assertType<IsExact<Result, Record<never, never>>>(true);
      });
    });
  });
});
