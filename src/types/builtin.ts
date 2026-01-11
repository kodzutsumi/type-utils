// Copyright 2020 - present integereleven. All rights reserved. MIT license.

import type { Permit } from '@kz/type-utils/lint';

import type { Primitive } from './primitive.ts';

export type Builtin =
  | Primitive
  | Permit<'Function', 'AnyCallable'>
  | Date
  | RegExp
  | Error
  | Generator
  | { readonly [Symbol.toStringTag]: string };
