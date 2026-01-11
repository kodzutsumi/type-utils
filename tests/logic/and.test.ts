// deno-lint-ignore-file no-boolean-literal-for-arguments

import { describe, it } from '@std/testing/bdd';
import { assertType, type IsExact } from '@std/testing/types';

import type { And } from '@kz/type-utils/logic';

import type { $Else, $Then } from '@kz/type-utils/options';

describe('Logic - And', () => {
  describe('with defaults', () => {
    it('should return true for And<true, true>', () => {
      type Actual = And<true, true>;
      type Expected = true;

      assertType<IsExact<Actual, Expected>>(true);
    });

    it('should return false for And<true, false>', () => {
      type Actual = And<true, false>;
      type Expected = false;

      assertType<IsExact<Actual, Expected>>(true);
    });

    it('should return false for And<false, true>', () => {
      type Actual = And<false, true>;
      type Expected = false;

      assertType<IsExact<Actual, Expected>>(true);
    });

    it('should return false for And<false, false>', () => {
      type Actual = And<false, false>;
      type Expected = false;

      assertType<IsExact<Actual, Expected>>(true);
    });
  });

  describe('with $Then option', () => {
    it('should return the Then type for And<true, true, $Then<Type>>', () => {
      type Actual = And<true, true, $Then<string>>;
      type Expected = string;

      assertType<IsExact<Actual, Expected>>(true);
    });
  });

  describe('with $Else option', () => {
    it('should return the Else type for And<true, false, $Else<Type>>', () => {
      type Actual = And<true, false, $Else<number>>;
      type Expected = number;

      assertType<IsExact<Actual, Expected>>(true);
    });
  });

  describe('with both $Then and $Else options', () => {
    it('should return the Then type for And<true, $Then<Type> & $Else<Type>>', () => {
      type Actual = And<true, true, $Then<string> & $Else<number>>;
      type Expected = string;

      assertType<IsExact<Actual, Expected>>(true);
    });

    it('should return the Else type for And<true, false, $Then<Type> & $Else<Type>>', () => {
      type Actual = And<true, false, $Then<string> & $Else<number>>;
      type Expected = number;

      assertType<IsExact<Actual, Expected>>(true);
    });
  });
});
