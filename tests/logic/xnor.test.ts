// deno-lint-ignore-file no-boolean-literal-for-arguments

import { describe, it } from '@std/testing/bdd';
import { assertType, type IsExact } from '@std/testing/types';

import type { Xnor } from '@kz/type-utils/logic';

import type { $Else, $Then } from '@kz/type-utils/options';

describe('Logic - Xnor', () => {
  describe('with defaults', () => {
    it('should return true for Xnor<true, true>', () => {
      type Actual = Xnor<true, true>;
      type Expected = true;

      assertType<IsExact<Actual, Expected>>(true);
    });

    it('should return false for Xnor<true, false>', () => {
      type Actual = Xnor<true, false>;
      type Expected = false;

      assertType<IsExact<Actual, Expected>>(true);
    });

    it('should return false for Xnor<false, true>', () => {
      type Actual = Xnor<false, true>;
      type Expected = false;

      assertType<IsExact<Actual, Expected>>(true);
    });

    it('should return true for Xnor<false, false>', () => {
      type Actual = Xnor<false, false>;
      type Expected = true;

      assertType<IsExact<Actual, Expected>>(true);
    });
  });

  describe('with $Then option', () => {
    it('should return the Then type for Xnor<true, true, $Then<Type>>', () => {
      type Actual = Xnor<true, true, $Then<string>>;
      type Expected = string;

      assertType<IsExact<Actual, Expected>>(true);
    });
  });

  describe('with $Else option', () => {
    it('should return the Else type for Xnor<true, false, $Else<Type>>', () => {
      type Actual = Xnor<true, false, $Else<number>>;
      type Expected = number;

      assertType<IsExact<Actual, Expected>>(true);
    });
  });

  describe('with both $Then Or $Else options', () => {
    it('should return the Then type for Xnor<true, true, $Then<Type> & $Else<Type>>', () => {
      type Actual = Xnor<true, true, $Then<string> & $Else<number>>;
      type Expected = string;

      assertType<IsExact<Actual, Expected>>(true);
    });

    it('should return the Else type for Xnor<true, false, $Then<Type> & $Else<Type>>', () => {
      type Actual = Xnor<true, false, $Then<string> & $Else<number>>;
      type Expected = number;

      assertType<IsExact<Actual, Expected>>(true);
    });

    it('should return the Then type for Xnor<false, false, $Then<Type> & $Else<Type>>', () => {
      type Actual = Xnor<false, false, $Then<string> & $Else<number>>;
      type Expected = string;

      assertType<IsExact<Actual, Expected>>(true);
    });
  });
});
