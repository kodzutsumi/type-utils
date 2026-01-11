// deno-lint-ignore-file no-boolean-literal-for-arguments

import { describe, it } from '@std/testing/bdd';
import { assertType, type IsExact } from '@std/testing/types';

import type {
  $AsAsync,
  $AsExcluded,
  $AsForward,
  $AsGetter,
  $AsImmutable,
  $AsIncluded,
  $AsInverted,
  $AsLoose,
  $AsMutable,
  $AsOptional,
  $AsRequired,
  $AsReverse,
  $AsSafe,
  $AsSetter,
  $AsStrict,
  $AsSync,
  $AsUnsafe,
  $AsUpright,
  $Else,
  $ResolveOptions,
  $Then,
} from '@kz/type-utils/options';

describe('Base - $ResolveOptions', () => {
  // $UseAsync
  it('should flip $AsAsync to $AsSync with $AsInverted', () => {
    type $AsyncResult = $ResolveOptions<$AsAsync & $AsInverted>;
    type $SyncResult = $ResolveOptions<$AsSync>;

    assertType<IsExact<$AsyncResult, $AsSync>>(true);
    assertType<IsExact<$SyncResult, $AsSync>>(true);
  });
  // $UseDirection
  it('should flip $AsReverse to $AsForward with $AsInverted', () => {
    type $ReverseResult = $ResolveOptions<$AsReverse & $AsInverted>;
    type $ForwardResult = $ResolveOptions<$AsForward>;

    assertType<IsExact<$ReverseResult, $AsForward>>(true);
    assertType<IsExact<$ForwardResult, $AsForward>>(true);
  });
  // $UseElse
  it('should flip $Else to $Then', () => {
    type $ElseResult = $ResolveOptions<$Else<string> & $AsInverted>;
    type $ThenResult = $Then<string> & $Else<true>;

    assertType<IsExact<$ElseResult, $ThenResult>>(true);
  });
  // $UseExclusion
  it('should flip $AsExcluded to $AsIncluded with $AsInverted', () => {
    type $ExcludedResult = $ResolveOptions<$AsExcluded & $AsInverted>;
    type $IncludedResult = $ResolveOptions<$AsIncluded>;

    assertType<IsExact<$ExcludedResult, $AsIncluded>>(true);
    assertType<IsExact<$IncludedResult, $AsIncluded>>(true);
  });
  // $UseFilter
  it('should flip $AsIncluded to $AsExcluded with $AsInverted', () => {
    type $IncludedResult = $ResolveOptions<$AsIncluded & $AsInverted>;
    type $ExcludedResult = $ResolveOptions<$AsExcluded>;

    assertType<IsExact<$IncludedResult, $AsExcluded>>(true);
    assertType<IsExact<$ExcludedResult, $AsExcluded>>(true);
  });
  // $UseImmutable
  it('should flip $AsImmutable to $AsMutable with $AsInverted', () => {
    type $ImmutableResult = $ResolveOptions<$AsImmutable & $AsInverted>;
    type $MutableResult = $ResolveOptions<$AsMutable>;

    assertType<IsExact<$ImmutableResult, $AsMutable>>(true);
    assertType<IsExact<$MutableResult, $AsMutable>>(true);
  });
  // $UseInversion
  it('should flip strip $UseInversion', () => {
    type $InvertedResult = $ResolveOptions<$AsInverted & $AsInverted>;
    type $UprightResult = $ResolveOptions<$AsUpright>;

    assertType<IsExact<$InvertedResult, Record<never, never>>>(true);
    assertType<IsExact<$UprightResult, Record<never, never>>>(true);
  });
  // $UseRequired
  it('should flip $AsRequired to $AsOptional with $AsInverted', () => {
    type $RequiredResult = $ResolveOptions<$AsRequired & $AsInverted>;
    type $OptionalResult = $ResolveOptions<$AsOptional>;

    assertType<IsExact<$RequiredResult, $AsOptional>>(true);
    assertType<IsExact<$OptionalResult, $AsOptional>>(true);
  });
  // $UseSafe
  it('should flip $AsSafe to $AsUnsafe with $AsInverted', () => {
    type $SafeResult = $ResolveOptions<$AsSafe & $AsInverted>;
    type $UnsafeResult = $ResolveOptions<$AsUnsafe>;

    assertType<IsExact<$SafeResult, $AsUnsafe>>(true);
    assertType<IsExact<$UnsafeResult, $AsUnsafe>>(true);
  });
  // $UseSetter
  it('should flip $AsSetter to $AsGetter with $AsInverted', () => {
    type $SetterResult = $ResolveOptions<$AsSetter & $AsInverted>;
    type $GetterResult = $ResolveOptions<$AsGetter>;

    assertType<IsExact<$SetterResult, $AsGetter>>(true);
    assertType<IsExact<$GetterResult, $AsGetter>>(true);
  });
  // $UseStrict
  it('should flip $AsStrict to $AsLoose with $AsInverted', () => {
    type $StrictResult = $ResolveOptions<$AsStrict & $AsInverted>;
    type $LooseResult = $ResolveOptions<$AsLoose>;

    assertType<IsExact<$StrictResult, $AsLoose>>(true);
    assertType<IsExact<$LooseResult, $AsLoose>>(true);
  });
  // $UseThen
  it('should flip $Then to $Else', () => {
    type $ThenResult = $ResolveOptions<$Then<string> & $AsInverted>;
    type $ElseResult = $Then<false> & $Else<string>;

    assertType<IsExact<$ElseResult, $ThenResult>>(true);
  });

  // $Then and $Else combined
  it('should flip $Then to $Else with $AsInverted', () => {
    type $ElseResult = $ResolveOptions<
      $Else<string> & $Then<number> & $AsInverted
    >;
    type $ThenResult = $Then<string> & $Else<number>;

    assertType<IsExact<$ElseResult, $ThenResult>>(true);
  });
});
