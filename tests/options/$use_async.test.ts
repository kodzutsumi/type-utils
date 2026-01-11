// deno-lint-ignore-file no-boolean-literal-for-arguments

import { describe, it } from '@std/testing/bdd';
import { assertType, type IsExact } from '@std/testing/types';

import type {
  $AsAsync,
  $AsSync,
  $GetUseAsync,
  $PickUseAsync,
  $UseAsync,
  $UseAsyncKey,
} from '@kz/type-utils/options';

describe('Option - Async', () => {
  describe('directive', () => {
    describe('$UseAsyncKey', () => {
      it('should be "$$use_async"', () => {
        type Expected = '$$use_async';
        type Actual = $UseAsyncKey;

        assertType<IsExact<Actual, Expected>>(true);
      });
    });

    describe('$UseAsync', () => {
      it('should create an option with the correct key and value', () => {
        type AsyncOption = $UseAsync<true>;
        type SyncOption = $UseAsync<false>;

        type ExpectedAsync = {
          '$$use_async': true;
        };

        type ExpectedSync = {
          '$$use_async': false;
        };

        assertType<IsExact<AsyncOption, ExpectedAsync>>(true);
        assertType<IsExact<SyncOption, ExpectedSync>>(true);
      });
    });
  });

  describe('attributes', () => {
    describe('$AsAsync', () => {
      it('should be equivalent to $UseAsync<true>', () => {
        type Expected = $UseAsync<true>;
        type Actual = $AsAsync;

        assertType<IsExact<Actual, Expected>>(true);
      });
    });

    describe('$AsSync', () => {
      it('should be equivalent to $UseAsync<false>', () => {
        type Expected = $UseAsync<false>;
        type Actual = $AsSync;

        assertType<IsExact<Actual, Expected>>(true);
      });
    });
  });

  describe('utilities', () => {
    describe('$GetUseAsync', () => {
      it('should retrieve the async option value from the options object', () => {
        type Options = {
          '$$use_async': true;
          '$$other_option': number;
        };

        type Result = $GetUseAsync<Options>;

        assertType<IsExact<Result, true>>(true);
      });

      it('should return false if the async option is not present', () => {
        type Options = {
          '$$other_option': number;
        };

        type Result = $GetUseAsync<Options>;

        assertType<IsExact<Result, false>>(true);
      });
    });

    describe('$PickUseAsync', () => {
      it('should pick the async option from the options object', () => {
        type Options = {
          '$$use_async': false;
          '$$other_option': string;
        };

        type Result = $PickUseAsync<Options>;

        type Expected = {
          '$$use_async': false;
        };

        assertType<IsExact<Result, Expected>>(true);
      });

      it('should default to $AsSync if the async option is not present', () => {
        type Options = {
          '$$other_option': string;
        };

        type Result = $PickUseAsync<Options>;

        assertType<IsExact<Result, $AsSync>>(true);
      });
    });
  });
});
