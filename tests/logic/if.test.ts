// deno-lint-ignore-file no-boolean-literal-for-arguments

import { describe, it } from '@std/testing/bdd';
import { assertType, type IsExact } from '@std/testing/types';

import type { If } from '@kz/type-utils/logic';

import type { $AsInverted, $Else, $Then } from '@kz/type-utils/options';

describe('Logic - If', () => {
  describe('with defaults', () => {
    it('should return true for If<true>', () => {
      type Actual = If<true>;
      type Expected = true;

      assertType<IsExact<Actual, Expected>>(true);
    });

    it('should return false for If<false>', () => {
      type Actual = If<false>;
      type Expected = false;

      assertType<IsExact<Actual, Expected>>(true);
    });
  });

  describe('with $Then option', () => {
    it('should return the Then type for If<true, $Then<Type>>', () => {
      type Actual = If<true, $Then<string>>;
      type Expected = string;

      assertType<IsExact<Actual, Expected>>(true);
    });
  });

  describe('with $Else option', () => {
    it('should return the Else type for If<false, $Else<Type>>', () => {
      type Actual = If<false, $Else<number>>;
      type Expected = number;

      assertType<IsExact<Actual, Expected>>(true);
    });
  });

  describe('with both $Then and $Else options', () => {
    it('should return the Then type for If<true, $Then<Type> & $Else<Type>>', () => {
      type Actual = If<true, $Then<string> & $Else<number>>;
      type Expected = string;

      assertType<IsExact<Actual, Expected>>(true);
    });

    it('should return the Else type for If<false, $Then<Type> & $Else<Type>>', () => {
      type Actual = If<false, $Then<string> & $Else<number>>;
      type Expected = number;

      assertType<IsExact<Actual, Expected>>(true);
    });
  });

  describe('with $AsInverted option', () => {
    describe('with defaults', () => {
      it('should return false for If<true>', () => {
        type Actual = If<true, $AsInverted>;
        type Expected = false;

        assertType<IsExact<Actual, Expected>>(true);
      });

      it('should return true for If<false>', () => {
        type Actual = If<false, $AsInverted>;
        type Expected = true;

        assertType<IsExact<Actual, Expected>>(true);
      });
    });

    describe('with $Then option', () => {
      it('should return the Else type for If<true, $Then<Type>>', () => {
        type Actual = If<true, $Then<string> & $AsInverted>;
        type Expected = false;

        assertType<IsExact<Actual, Expected>>(true);
      });
    });

    describe('with $Else option', () => {
      it('should return the Then type for If<false, $Else<Type>>', () => {
        type Actual = If<false, $Else<number> & $AsInverted>;
        type Expected = true;

        assertType<IsExact<Actual, Expected>>(true);
      });
    });

    describe('with both $Then and $Else options', () => {
      it('should return the Else type for If<true, $Then<Type> & $Else<Type>>', () => {
        type Actual = If<true, $Then<string> & $Else<number> & $AsInverted>;
        type Expected = number;

        assertType<IsExact<Actual, Expected>>(true);
      });

      it('should return the Then type for If<false, $Then<Type> & $Else<Type>>', () => {
        type Actual = If<false, $Then<string> & $Else<number> & $AsInverted>;
        type Expected = string;

        assertType<IsExact<Actual, Expected>>(true);
      });
    });
  });
});
