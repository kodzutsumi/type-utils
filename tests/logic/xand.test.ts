// deno-lint-ignore-file no-boolean-literal-for-arguments

import { describe, it } from '@std/testing/bdd';
import { assertType, type IsExact } from '@std/testing/types';

import type { Xand } from '@kz/type-utils/logic';

import type { $Else, $Then } from '@kz/type-utils/options';

describe('Logic - Xand', () => {
  describe('with defaults', () => {
    it('should return true for Xand<true, true>', () => {
      type Actual = Xand<true, true>;
      type Expected = true;

      assertType<IsExact<Actual, Expected>>(true);
    });

    it('should return false for Xand<true, false>', () => {
      type Actual = Xand<true, false>;
      type Expected = false;

      assertType<IsExact<Actual, Expected>>(true);
    });

    it('should return false for Xand<false, true>', () => {
      type Actual = Xand<false, true>;
      type Expected = false;

      assertType<IsExact<Actual, Expected>>(true);
    });

    it('should return true for Xand<false, false>', () => {
      type Actual = Xand<false, false>;
      type Expected = true;

      assertType<IsExact<Actual, Expected>>(true);
    });
  });

  describe('with $Then option', () => {
    it('should return the Then type for Xand<true, true, $Then<Type>>', () => {
      type Actual = Xand<true, true, $Then<string>>;
      type Expected = string;

      assertType<IsExact<Actual, Expected>>(true);
    });
  });

  describe('with $Else option', () => {
    it('should return the Else type for Xand<true, false, $Else<Type>>', () => {
      type Actual = Xand<true, false, $Else<number>>;
      type Expected = number;

      assertType<IsExact<Actual, Expected>>(true);
    });
  });

  describe('with both $Then Or $Else options', () => {
    it('should return the Then type for Xand<true, true, $Then<Type> & $Else<Type>>', () => {
      type Actual = Xand<true, true, $Then<string> & $Else<number>>;
      type Expected = string;

      assertType<IsExact<Actual, Expected>>(true);
    });

    it('should return the Else type for Xand<true, false, $Then<Type> & $Else<Type>>', () => {
      type Actual = Xand<true, false, $Then<string> & $Else<number>>;
      type Expected = number;

      assertType<IsExact<Actual, Expected>>(true);
    });

    it('should return the Then type for Xand<false, false, $Then<Type> & $Else<Type>>', () => {
      type Actual = Xand<false, false, $Then<string> & $Else<number>>;
      type Expected = string;

      assertType<IsExact<Actual, Expected>>(true);
    });
  });
});
