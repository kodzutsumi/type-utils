// Copyright 2020 - present integereleven. All rights reserved. MIT license.

import type { Nil } from './nil.ts';

export type NonNil<Type> = Exclude<Type, Nil>;