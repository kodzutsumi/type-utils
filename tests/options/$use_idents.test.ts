// deno-lint-ignore-file no-boolean-literal-for-arguments

import { describe, it } from '@std/testing/bdd';
import { assertType, type IsExact } from '@std/testing/types';

import type {
  $GetUseIdents,
  $IdentsOf,
  $PickUseIdents,
  $UseIdents,
  $UseIdentsKey,
  $UseIdentsTypeKey,
} from '@kz/type-utils/options';

describe('Option - Idents', () => {
  describe('directive', () => {
    describe('$UseIdentsKey', () => {
      it('should be "$$use_idents"', () => {
        type Expected = '$$use_idents';
        type Actual = $UseIdentsKey;

        assertType<IsExact<Actual, Expected>>(true);
      });
    });

    describe('$UseIdentsTypeKey', () => {
      it('should be "$$use_idents"', () => {
        type Expected = '$$use_idents_type';
        type Actual = $UseIdentsTypeKey;

        assertType<IsExact<Actual, Expected>>(true);
      });
    });
  });

  describe('Objects', () => {
    describe('directive', () => {
      describe('$UseIdents', () => {
        describe('all idents', () => {
          it('should create an option with the correct key and value', () => {
            type TestObject = { a: number; b: string };
            type IdentsOption = $UseIdents<TestObject>;

            type ExpectedIdents = {
              '$$use_idents': keyof TestObject;
              '$$use_idents_type': TestObject;
            };

            assertType<IsExact<IdentsOption, ExpectedIdents>>(true);
          });
        });

        describe('filtered idents', () => {
          it('should create an option with the correct key and value', () => {
            type TestObject = { a: number; b: string };
            type IdentsOption = $UseIdents<TestObject, 'a'>;

            type ExpectedIdents = {
              '$$use_idents': Exclude<keyof TestObject, 'b'>;
              '$$use_idents_type': TestObject;
            };

            assertType<IsExact<IdentsOption, ExpectedIdents>>(true);
          });
        });
      });
    });
    describe('attributes', () => {
      describe('$IdentsOf', () => {
        describe('all idents', () => {
          it('should be equivalent to $UseIdents<Type>', () => {
            type TestObject = { a: number; b: string };
            type Expected = $UseIdents<TestObject>;
            type Actual = $IdentsOf<TestObject>;

            assertType<IsExact<Actual, Expected>>(true);
          });
        });

        describe('filtered idents', () => {
          it('should be equivalent to $UseIdents<Type, Keys>', () => {
            type TestObject = { a: number; b: string };
            type Expected = $UseIdents<TestObject, 'a'>;
            type Actual = $IdentsOf<TestObject, 'a'>;

            assertType<IsExact<Actual, Expected>>(true);
          });
        });
      });
    });

    describe('utilities', () => {
      describe('$GetUseIdents', () => {
        it('should retrieve the idents option value from the options object', () => {
          type TestObject = { a: number; b: string };
          type Options = {
            '$$use_idents': keyof TestObject;
            '$$use_idents_type': TestObject;
            '$$other_option': number;
          };

          type Result = $GetUseIdents<Options>;

          assertType<IsExact<Result, keyof TestObject>>(true);
        });

        it('should return PropertyKey if the idents option is not present', () => {
          type TestObject = { a: number; b: string };
          type Options = {
            '$$use_idents_type': TestObject;
            '$$other_option': number;
          };

          type Result = $GetUseIdents<Options>;

          assertType<IsExact<Result, PropertyKey>>(true);
        });
      });

      describe('$PickUseIdents', () => {
        it('should pick the idents option from the options object', () => {
          type TestObject = { a: number; b: string };
          type Options = {
            '$$use_idents': keyof TestObject;
            '$$other_option': string;
          };

          type Result = $PickUseIdents<Options>;

          type Expected = {
            '$$use_idents': keyof TestObject;
          };

          assertType<IsExact<Result, Expected>>(true);
        });

        it('should default to PropertyKey if the idents option is not present', () => {
          type TestObject = { a: number; b: string };
          type Options = {
            '$$use_idents_type': keyof TestObject;
            '$$other_option': string;
          };

          type Result = $PickUseIdents<Options>;

          assertType<IsExact<Result, { '$$use_idents': PropertyKey }>>(true);
        });
      });
    });
  });

  describe('Tuples', () => {
    describe('directive', () => {
      describe('$UseIdents', () => {
        describe('all idents', () => {
          it('should create an option with the correct key and value', () => {
            type TestObject = [string, number];
            type IdentsOption = $UseIdents<TestObject>;

            type ExpectedIdents = {
              '$$use_idents': keyof TestObject;
              '$$use_idents_type': TestObject;
            };

            assertType<IsExact<IdentsOption, ExpectedIdents>>(true);
          });
        });

        describe('filtered idents', () => {
          it('should create an option with the correct key and value', () => {
            type TestObject = [string, number];
            type IdentsOption = $UseIdents<TestObject, 0>;

            type ExpectedIdents = {
              '$$use_idents': 0;
              '$$use_idents_type': TestObject;
            };

            assertType<IsExact<IdentsOption, ExpectedIdents>>(true);
          });
        });
      });
    });

    describe('attributes', () => {
      describe('$IdentsOf', () => {
        describe('all idents', () => {
          it('should be equivalent to $UseIdents<Type>', () => {
            type TestObject = [string, number];
            type Expected = $UseIdents<TestObject>;
            type Actual = $IdentsOf<TestObject>;

            assertType<IsExact<Actual, Expected>>(true);
          });
        });

        describe('filtered idents', () => {
          it('should be equivalent to $UseIdents<Type>', () => {
            type TestObject = [string, number];
            type Expected = $UseIdents<TestObject, 0>;
            type Actual = $IdentsOf<TestObject, 0>;

            assertType<IsExact<Actual, Expected>>(true);
          });
        });
      });
    });

    describe('utilities', () => {
      describe('$GetUseIdents', () => {
        it('should retrieve the idents option value from the options object', () => {
          type TestObject = [string, number];
          type Options = {
            '$$use_idents': keyof TestObject;
            '$$use_idents_type': TestObject;
            '$$other_option': number;
          };

          type Result = $GetUseIdents<Options>;

          assertType<IsExact<Result, keyof TestObject>>(true);
        });

        it('should return PropertyKey if the idents option is not present', () => {
          type TestObject = [string, number];
          type Options = {
            '$$use_idents_type': TestObject;
            '$$other_option': number;
          };

          type Result = $GetUseIdents<Options>;

          assertType<IsExact<Result, PropertyKey>>(true);
        });
      });

      describe('$PickUseIdents', () => {
        it('should pick the idents option from the options object', () => {
          type TestObject = [string, number];
          type Options = {
            '$$use_idents': keyof TestObject;
            '$$other_option': string;
          };

          type Result = $PickUseIdents<Options>;

          type Expected = {
            '$$use_idents': keyof TestObject;
          };

          assertType<IsExact<Result, Expected>>(true);
        });

        it('should default to PropertyKey if the idents option is not present', () => {
          type TestObject = [string, number];
          type Options = {
            '$$use_idents_type': keyof TestObject;
            '$$other_option': string;
          };

          type Result = $PickUseIdents<Options>;

          assertType<IsExact<Result, { '$$use_idents': PropertyKey }>>(true);
        });
      });
    });
  });
});
