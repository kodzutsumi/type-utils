// Copyright 2020 - present integereleven. All rights reserved. MIT license.

import type { Permit } from '@kz/type-utils/lint';

export type Any<Reason extends string> = Permit<'any', Reason>;
