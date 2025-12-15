// deno-lint-ignore-file no-boolean-literal-for-arguments

import { describe, it } from '@std/testing/bdd';
import { assertType, type IsExact } from '@std/testing/types';

import type {
  $AsReverse,
  $AsForward,
  $GetUseDirection,
  $PickUseDirection,
  $UseDirection,
  $UseDirectionKey,
} from '@kz/type-utils/options';

describe('Option - Direction', () => {
  describe('$UseDirectionKey', () => {
    it('should be "$$use_direction"', () => {
      type Expected = '$$use_direction';
      type Actual = $UseDirectionKey;

      assertType<IsExact<Actual, Expected>>(true);
    });
  });

  describe('$UseDirection', () => {
    it('should create an option with the correct key and value', () => {
      type ReverseOption = $UseDirection<true>;
      type ForwardOption = $UseDirection<false>;

      type ExpectedReversed = {
        '$$use_direction': true;
      };

      type ExpectedForward = {
        '$$use_direction': false;
      };

      assertType<IsExact<ReverseOption, ExpectedReversed>>(true);
      assertType<IsExact<ForwardOption, ExpectedForward>>(true);
    });
  });

  describe('$AsReverse', () => {
    it('should be equivalent to $UseDirection<true>', () => {
      type Expected = $UseDirection<true>;
      type Actual = $AsReverse;

      assertType<IsExact<Actual, Expected>>(true);
    });
  });

  describe('$AsForward', () => {
    it('should be equivalent to $UseDirection<false>', () => {
      type Expected = $UseDirection<false>;
      type Actual = $AsForward;

      assertType<IsExact<Actual, Expected>>(true);
    });
  });

  describe('$GetUseDirection', () => {
    it('should retrieve the direction option value from the options object', () => {
      type Options = {
        '$$use_direction': true;
        '$$other_option': number;
      };

      type Result = $GetUseDirection<Options>;

      assertType<IsExact<Result, true>>(true);
    });

    it('should return never if the direction option is not present', () => {
      type Options = {
        '$$other_option': number;
      };

      type Result = $GetUseDirection<Options>;

      assertType<IsExact<Result, never>>(true);
    });
  });

  describe('$PickUseDirection', () => {
    it('should pick the direction option from the options object', () => {
      type Options = {
        '$$use_direction': false;
        '$$other_option': string;
      };

      type Result = $PickUseDirection<Options>;

      type Expected = {
        '$$use_direction': false;
      };

      assertType<IsExact<Result, Expected>>(true);
    });

    it('should return an empty object if the direction option is not present', () => {
      type Options = {
        '$$other_option': string;
      };

      type Result = $PickUseDirection<Options>;

      assertType<IsExact<Result, Record<never, never>>>(true);
    });
  });
});
