// deno-lint-ignore-file no-boolean-literal-for-arguments

import { describe, it } from '@std/testing/bdd';
import { assertType, type IsExact } from '@std/testing/types';

import type { Not } from '@kz/type-utils/logic';

import type { $AsInverted, $Else, $Then } from '@kz/type-utils/options';

describe('Logic - Not', () => {
  describe('with defaults', () => {
    it('should return false for Not<true>', () => {
      type Actual = Not<true>;
      type Expected = false;

      assertType<IsExact<Actual, Expected>>(true);
    });

    it('should return true for Not<false>', () => {
      type Actual = Not<false>;
      type Expected = true;

      assertType<IsExact<Actual, Expected>>(true);
    });
  });

  describe('with $Then option', () => {
    it('should return the Then type for Not<false, $Then<Type>>', () => {
      type Actual = Not<false, $Then<string>>;
      type Expected = string;

      assertType<IsExact<Actual, Expected>>(true);
    });
  });

  describe('with $Else option', () => {
    it('should return the Else type for Not<true, $Else<Type>>', () => {
      type Actual = Not<true, $Else<number>>;
      type Expected = number;

      assertType<IsExact<Actual, Expected>>(true);
    });
  });

  describe('with both $Then and $Else options', () => {
    it('should return the Else type for Not<true, $Then<Type> & $Else<Type>>', () => {
      type Actual = Not<true, $Then<string> & $Else<number>>;
      type Expected = number;

      assertType<IsExact<Actual, Expected>>(true);
    });

    it('should return the Then type for Not<false, $Then<Type> & $Else<Type>>', () => {
      type Actual = Not<false, $Then<string> & $Else<number>>;
      type Expected = string;

      assertType<IsExact<Actual, Expected>>(true);
    });
  });

  describe('with $AsInverted option', () => {
    describe('with defaults', () => {
      it('should return true for Not<true>', () => {
        type Actual = Not<true, $AsInverted>;
        type Expected = true;

        assertType<IsExact<Actual, Expected>>(true);
      });

      it('should return false for Not<false>', () => {
        type Actual = Not<false, $AsInverted>;
        type Expected = false;

        assertType<IsExact<Actual, Expected>>(true);
      });
    });

    describe('with $Then option', () => {
      it('should return the Else type for Not<false, $Then<Type>>', () => {
        type Actual = Not<false, $Then<string> & $AsInverted>;
        type Expected = false;

        assertType<IsExact<Actual, Expected>>(true);
      });
    });

    describe('with $Else option', () => {
      it('should return the Then type for Not<true, $Else<Type>>', () => {
        type Actual = Not<true, $Else<number> & $AsInverted>;
        type Expected = true;

        assertType<IsExact<Actual, Expected>>(true);
      });
    });

    describe('with both $Then and $Else options', () => {
      it('should return the Then type for Not<true, $Then<Type> & $Else<Type>>', () => {
        type Actual = Not<true, $Then<string> & $Else<number> & $AsInverted>;
        type Expected = string;

        assertType<IsExact<Actual, Expected>>(true);
      });

      it('should return the Else type for Not<false, $Then<Type> & $Else<Type>>', () => {
        type Actual = Not<false, $Then<string> & $Else<number> & $AsInverted>;
        type Expected = number;

        assertType<IsExact<Actual, Expected>>(true);
      });
    });
  });
});
