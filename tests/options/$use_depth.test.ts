// deno-lint-ignore-file no-boolean-literal-for-arguments

import { describe, it } from '@std/testing/bdd';
import { assertType, type IsExact } from '@std/testing/types';

import type {
  $AsDeep,
  $AsLevel,
  $AsShallow,
  $DecrementDepth,
  $Else,
  $GetUseDepth,
  $IsDeep,
  $PickUseDepth,
  $Then,
  $UseDepth,
  $UseDepthKey,
} from '@kz/type-utils/options';

describe('Option - Depth', () => {
  describe('directive', () => {
    describe('$UseDepthKey', () => {
      it('should be "$$use_depth"', () => {
        type Expected = '$$use_depth';
        type Actual = $UseDepthKey;

        assertType<IsExact<Actual, Expected>>(true);
      });
    });

    describe('$UseDepth', () => {
      it('should create an option with the correct key and value', () => {
        type DeepOption = $UseDepth<true>;
        type ShallowOption = $UseDepth<false>;
        type LeveledOption = $UseDepth<5 | 8>;

        type ExpectedDeep = {
          '$$use_depth': true;
        };
        type ExpectedShallow = {
          '$$use_depth': false;
        };
        type ExpectedLeveled = {
          '$$use_depth': 5 | 8;
        };

        assertType<IsExact<DeepOption, ExpectedDeep>>(true);
        assertType<IsExact<ShallowOption, ExpectedShallow>>(true);
        assertType<IsExact<LeveledOption, ExpectedLeveled>>(true);
      });
    });
  });

  describe('attributes', () => {
    describe('$AsDeep', () => {
      it('should be equivalent to $UseDepth<true>', () => {
        type Expected = $UseDepth<true>;
        type Actual = $AsDeep;

        assertType<IsExact<Actual, Expected>>(true);
      });
    });

    describe('$AsShallow', () => {
      it('should be equivalent to $UseDepth<false>', () => {
        type Expected = $UseDepth<false>;
        type Actual = $AsShallow;

        assertType<IsExact<Actual, Expected>>(true);
      });
    });

    describe('$AsLevel', () => {
      it('should be equivalent to $UseDepth<number>', () => {
        type Expected = $UseDepth<5 | 10>;
        type Actual = $AsLevel<5 | 10>;

        assertType<IsExact<Actual, Expected>>(true);
      });
    });
  });

  describe('utilities', () => {
    describe('$GetUseDepth', () => {
      it('should retrieve the depth option value from the options object', () => {
        type Options = {
          '$$use_depth': 'collection';
          '$$other_option': number;
        };

        type Result = $GetUseDepth<Options>;

        assertType<IsExact<Result, 'collection'>>(true);
      });

      it('should return false if the depth option is not present', () => {
        type Options = {
          '$$other_option': number;
        };

        type Result = $GetUseDepth<Options>;

        assertType<IsExact<Result, false>>(true);
      });
    });

    describe('$PickUseDepth', () => {
      it('should pick the depth option from the options object', () => {
        type Options = {
          '$$use_depth': 'idents';
          '$$other_option': string;
        };

        type Result = $PickUseDepth<Options>;

        type Expected = {
          '$$use_depth': 'idents';
        };

        assertType<IsExact<Result, Expected>>(true);
      });

      it('should default to $AsShallow if the depth option is not present', () => {
        type Options = {
          '$$other_option': string;
        };

        type Result = $PickUseDepth<Options>;

        assertType<IsExact<Result, $AsShallow>>(true);
      });
    });

    describe('$DecrementDepth', () => {
      it('should flip true to 9', () => {
        type Expected = $AsLevel<9>;
        type Actual = $DecrementDepth<$AsDeep>;

        assertType<IsExact<Actual, Expected>>(true);
      });

      it('should leave false unchanged', () => {
        type Expected = $AsShallow;
        type Actual = $DecrementDepth<$AsShallow>;

        assertType<IsExact<Actual, Expected>>(true);
      });

      it('should change 1 to shallow', () => {
        type Expected = $AsShallow;
        type Actual = $DecrementDepth<$AsLevel<1>>;

        assertType<IsExact<Actual, Expected>>(true);
      });

      it('should decrement numeric levels by 1', () => {
        type $DepthOption9 = $UseDepth<9>;
        type Expected8 = $AsLevel<8>;
        type Actual8 = $DecrementDepth<$DepthOption9>;

        type Expected7 = $AsLevel<7>;
        type Actual7 = $DecrementDepth<Actual8>;

        type Expected6 = $AsLevel<6>;
        type Actual6 = $DecrementDepth<Actual7>;

        type Expected5 = $AsLevel<5>;
        type Actual5 = $DecrementDepth<Actual6>;

        type Expected4 = $AsLevel<4>;
        type Actual4 = $DecrementDepth<Actual5>;

        type Expected3 = $AsLevel<3>;
        type Actual3 = $DecrementDepth<Actual4>;

        type Expected2 = $AsLevel<2>;
        type Actual2 = $DecrementDepth<Actual3>;

        type Expected1 = $AsLevel<1>;
        type Actual1 = $DecrementDepth<Actual2>;

        assertType<IsExact<Actual8, Expected8>>(true);
        assertType<IsExact<Actual7, Expected7>>(true);
        assertType<IsExact<Actual6, Expected6>>(true);
        assertType<IsExact<Actual5, Expected5>>(true);
        assertType<IsExact<Actual4, Expected4>>(true);
        assertType<IsExact<Actual3, Expected3>>(true);
        assertType<IsExact<Actual2, Expected2>>(true);
        assertType<IsExact<Actual1, Expected1>>(true);
      });
    });

    describe('$IsDeep', () => {
      it('should evaluate to true for deep options', () => {
        type Expected = true;
        type Actual = $IsDeep<$AsDeep>;

        assertType<IsExact<Actual, Expected>>(true);
      });

      it('should evaluate to true for leveled options', () => {
        type Expected = true;
        type Actual = $IsDeep<$AsLevel<5>>;

        assertType<IsExact<Actual, Expected>>(true);
      });

      it('should evaluate to false for shallow options', () => {
        type Expected = false;
        type Actual = $IsDeep<$AsShallow>;

        assertType<IsExact<Actual, Expected>>(true);
      });

      it('should accept custom then/else options', () => {
        type Expected = 'yes';
        type Actual = $IsDeep<
          $AsDeep,
          $Then<'yes'> & $Else<'no'>
        >;

        assertType<IsExact<Actual, Expected>>(true);
      });

      it('should accept custom then/else options for leveled options', () => {
        type Expected = 'yes';
        type Actual = $IsDeep<
          $AsLevel<3>,
          $Then<'yes'> & $Else<'no'>
        >;

        assertType<IsExact<Actual, Expected>>(true);
      });

      it('should accept custom then/else options for shallow options', () => {
        type Expected = 'no';
        type Actual = $IsDeep<
          $AsShallow,
          $Then<'yes'> & $Else<'no'>
        >;

        assertType<IsExact<Actual, Expected>>(true);
      });
    });
  });
});
