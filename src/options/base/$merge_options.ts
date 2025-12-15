// Copyright 2020 - present integereleven. All rights reserved. MIT license.

export type $MergeOptions<Defaults, $Options> = {
  [Key in keyof Defaults]: Key extends keyof $Options ? $Options[Key]
    : Defaults[Key];
};
