// deno-lint-ignore-file no-boolean-literal-for-arguments

import { describe, it } from '@std/testing/bdd';
import { assertType, type IsExact } from '@std/testing/types';

import type {
  $CollectAll,
  $CollectIdents,
  $CollectValues,
  $GetUseCollection,
  $PickUseCollection,
  $UseCollection,
  $UseCollectionKey,
} from '@kz/type-utils/options';

describe('Option - Collection', () => {
  describe('directive', () => {
    describe('$UseCollectionKey', () => {
      it('should be "$$use_collection"', () => {
        type Expected = '$$use_collection';
        type Actual = $UseCollectionKey;

        assertType<IsExact<Actual, Expected>>(true);
      });
    });

    describe('$UseCollection', () => {
      it('should create an option with the correct key and value', () => {
        type CollectionOption = $UseCollection;

        type ExpectedDefault = {
          '$$use_collection': 'collection';
        };

        assertType<IsExact<CollectionOption, ExpectedDefault>>(true);
      });
    });
  });

  describe('attributes', () => {
    describe('$CollectAll', () => {
      it("should be equivalent to $UseCollection<'collection'>", () => {
        type Expected = $UseCollection;
        type Actual = $CollectAll;

        assertType<IsExact<Actual, Expected>>(true);
      });
    });

    describe('$CollectIdents', () => {
      it("should be equivalent to $UseCollection<'idents'>", () => {
        type Expected = $UseCollection<'idents'>;
        type Actual = $CollectIdents;

        assertType<IsExact<Actual, Expected>>(true);
      });
    });

    describe('$CollectValues', () => {
      it("should be equivalent to $UseCollection<'values'>", () => {
        type Expected = $UseCollection<'values'>;
        type Actual = $CollectValues;

        assertType<IsExact<Actual, Expected>>(true);
      });
    });
  });

  describe('utilities', () => {
    describe('$GetUseCollection', () => {
      it('should retrieve the collection option value from the options object', () => {
        type Options = {
          '$$use_collection': 'collection';
          '$$other_option': number;
        };

        type Result = $GetUseCollection<Options>;

        assertType<IsExact<Result, 'collection'>>(true);
      });

      it("should return 'collection' if the collection option is not present", () => {
        type Options = {
          '$$other_option': number;
        };

        type Result = $GetUseCollection<Options>;

        assertType<IsExact<Result, 'collection'>>(true);
      });
    });

    describe('$PickUseCollection', () => {
      it('should pick the collection option from the options object', () => {
        type Options = {
          '$$use_collection': 'idents';
          '$$other_option': string;
        };

        type Result = $PickUseCollection<Options>;

        type Expected = {
          '$$use_collection': 'idents';
        };

        assertType<IsExact<Result, Expected>>(true);
      });

      it('should default to $CollectAll if the collection option is not present', () => {
        type Options = {
          '$$other_option': string;
        };

        type Result = $PickUseCollection<Options>;

        assertType<IsExact<Result, $CollectAll>>(true);
      });
    });
  });
});
