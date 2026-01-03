// deno-lint-ignore-file no-boolean-literal-for-arguments

import { describe, it } from '@std/testing/bdd';
import { assertType, type IsExact } from '@std/testing/types';

import type { Xor } from '@kz/type-utils/logic';

import type { $Else, $Then } from '@kz/type-utils/options';

describe('Logic - Xor', () => {
  describe('with defaults', () => {
    it('should return false for Xor<true, true>', () => {
      type Actual = Xor<true, true>;
      type Expected = false;

      assertType<IsExact<Actual, Expected>>(true);
    });

    it('should return true for Xor<true, false>', () => {
      type Actual = Xor<true, false>;
      type Expected = true;

      assertType<IsExact<Actual, Expected>>(true);
    });

    it('should return true for Xor<false, true>', () => {
      type Actual = Xor<false, true>;
      type Expected = true;

      assertType<IsExact<Actual, Expected>>(true);
    });

    it('should return false for Xor<false, false>', () => {
      type Actual = Xor<false, false>;
      type Expected = false;

      assertType<IsExact<Actual, Expected>>(true);
    });
  });

  describe('with $Then option', () => {
    it('should return the Else type for Xor<true, true, $Then<Type>>', () => {
      type Actual = Xor<true, true, $Then<string>>;
      type Expected = false;

      assertType<IsExact<Actual, Expected>>(true);
    });
  });

  describe('with $Else option', () => {
    it('should return the Then type for Xor<true, false, $Else<Type>>', () => {
      type Actual = Xor<true, false, $Else<number>>;
      type Expected = true;

      assertType<IsExact<Actual, Expected>>(true);
    });
  });

  describe('with both $Then Or $Else options', () => {
    it('should return the Else type for Xor<true, true, $Then<Type> & $Else<Type>>', () => {
      type Actual = Xor<true, true, $Then<string> & $Else<number>>;
      type Expected = number;

      assertType<IsExact<Actual, Expected>>(true);
    });

    it('should return the Then type for Xor<true, false, $Then<Type> & $Else<Type>>', () => {
      type Actual = Xor<true, false, $Then<string> & $Else<number>>;
      type Expected = string;

      assertType<IsExact<Actual, Expected>>(true);
    });
  });
});
