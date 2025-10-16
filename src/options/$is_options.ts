import type { $OptionKey } from './$option_key.ts';

export type $IsOptions<T> = T extends Record<infer K, unknown>
  ? K extends $OptionKey ? true : false
  : false;
