import { $OptionKey } from './$option_key.ts';
import { $Options } from './$options.ts';

export type $PickOption<Key extends $OptionKey, Options extends $Options> =
  Key extends keyof Options ? { [K in Key]: Options[K] } : Record<never, never>;
