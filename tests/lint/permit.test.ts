// deno-lint-ignore-file no-boolean-literal-for-arguments ban-types no-explicit-any

import { describe, it } from '@std/testing/bdd';
import { assertType, type IsExact } from '@std/testing/types';

import type { Permit } from '@kz/type-utils/lint';

describe('Lint - Permit', () => {
  describe('reasoning', () => {
    it('requires a reason for any type', () => {
      type Test = Permit<'any', ''>;

      assertType<IsExact<Test, never>>(true);
    });
  });

  describe('permitting banned types', () => {
    it('permits the any type', () => {
      assertType<IsExact<Permit<'any', 'test'>, any>>(true);
    });

    it('permits the Function type', () => {
      assertType<IsExact<Permit<'Function', 'test'>, Function>>(true);
    });

    it('permits the Boolean type', () => {
      assertType<IsExact<Permit<'Boolean', 'test'>, Boolean>>(true);
    });

    it('permits the Number type', () => {
      assertType<IsExact<Permit<'Number', 'test'>, Number>>(true);
    });

    it('permits the String type', () => {
      assertType<IsExact<Permit<'String', 'test'>, String>>(true);
    });

    it('permits the Symbol type', () => {
      assertType<IsExact<Permit<'Symbol', 'test'>, Symbol>>(true);
    });

    it('permits the Object type', () => {
      assertType<IsExact<Permit<'Object', 'test'>, Object>>(true);
    });

    it('permits the {} type', () => {
      assertType<IsExact<Permit<'{}', 'test'>, {}>>(true);
    });
  });
});
