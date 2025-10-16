import type { $OptionKey } from './$option_key.ts';
import type { $Options } from './$options.ts';
import type { $PickOption } from './$pick_option.ts';

export type $GetOption<Key extends $OptionKey, Options extends $Options> =
  $PickOption<Key, Options> extends infer $Picked
    ? Record<never, never> extends $Picked ? never
    : Key extends keyof $Picked ? $Picked[Key]
    : never
    : never;
