// deno-lint-ignore-file no-boolean-literal-for-arguments ban-types no-explicit-any

import { describe, it } from '@std/testing/bdd';
import { assertType, type IsExact } from '@std/testing/types';

import type { BannedTypes } from '@kz/type-utils/lint';

describe('Lint - BannedTypes', () => {
  describe('types', () => {
    it('bans the any type', () => {
      assertType<IsExact<BannedTypes['any'], any>>(true);
    });

    it('bans the Function type', () => {
      assertType<IsExact<BannedTypes['Function'], Function>>(true);
    });

    it('bans the Boolean type', () => {
      assertType<IsExact<BannedTypes['Boolean'], Boolean>>(true);
    });

    it('bans the Number type', () => {
      assertType<IsExact<BannedTypes['Number'], Number>>(true);
    });

    it('bans the String type', () => {
      assertType<IsExact<BannedTypes['String'], String>>(true);
    });

    it('bans the Symbol type', () => {
      assertType<IsExact<BannedTypes['Symbol'], Symbol>>(true);
    });

    it('bans the Object type', () => {
      assertType<IsExact<BannedTypes['Object'], Object>>(true);
    });

    it('bans the {} type', () => {
      assertType<IsExact<BannedTypes['{}'], {}>>(true);
    });
  });
});
