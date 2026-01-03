// deno-lint-ignore-file no-boolean-literal-for-arguments

import { describe, it } from '@std/testing/bdd';
import { assertType, type IsExact } from '@std/testing/types';

import type { Or } from '@kz/type-utils/logic';

import type { $Else, $Then } from '@kz/type-utils/options';

describe('Logic - Or', () => {
  describe('with defaults', () => {
    it('should return true for Or<true, true>', () => {
      type Actual = Or<true, true>;
      type Expected = true;

      assertType<IsExact<Actual, Expected>>(true);
    });

    it('should return true for Or<true, false>', () => {
      type Actual = Or<true, false>;
      type Expected = true;

      assertType<IsExact<Actual, Expected>>(true);
    });

    it('should return true for Or<false, true>', () => {
      type Actual = Or<false, true>;
      type Expected = true;

      assertType<IsExact<Actual, Expected>>(true);
    });

    it('should return false for Or<false, false>', () => {
      type Actual = Or<false, false>;
      type Expected = false;

      assertType<IsExact<Actual, Expected>>(true);
    });
  });

  describe('with $Then option', () => {
    it('should return the Then type for Or<true, true, $Then<Type>>', () => {
      type Actual = Or<true, true, $Then<string>>;
      type Expected = string;

      assertType<IsExact<Actual, Expected>>(true);
    });
  });

  describe('with $Else option', () => {
    it('should return the Then type for Or<true, false, $Else<Type>>', () => {
      type Actual = Or<true, false, $Else<number>>;
      type Expected = true;

      assertType<IsExact<Actual, Expected>>(true);
    });
  });

  describe('with both $Then Or $Else options', () => {
    it('should return the Then type for Or<true, true, $Then<Type> & $Else<Type>>', () => {
      type Actual = Or<true, true, $Then<string> & $Else<number>>;
      type Expected = string;

      assertType<IsExact<Actual, Expected>>(true);
    });

    it('should return the Then type for Or<true, false, $Then<Type> & $Else<Type>>', () => {
      type Actual = Or<true, false, $Then<string> & $Else<number>>;
      type Expected = string;

      assertType<IsExact<Actual, Expected>>(true);
    });
  });
});
