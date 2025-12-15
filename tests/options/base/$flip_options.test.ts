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
  $FlipOptions,
} from '@kz/type-utils/options';

describe('$FlipOptions', () => {
  // $UseAsync
  it('should flip $AsAsync to $AsSync and vice versa', () => {
    type $AsyncResult = $FlipOptions<$AsAsync>;
    type $SyncResult = $FlipOptions<$AsSync>;

    assertType<IsExact<$AsyncResult, $AsSync>>(true);
    assertType<IsExact<$SyncResult, $AsAsync>>(true);
  });
  // $UseCollection
  // $UseCondition
  // $UseDefault
  // $UseDepth  
  // $UseDirection
  it('should flip $AsReverse to $AsForward and vice versa', () => {
    type $ReverseResult = $FlipOptions<$AsReverse>;
    type $ForwardResult = $FlipOptions<$AsForward>;

    assertType<IsExact<$ReverseResult, $AsForward>>(true);
    assertType<IsExact<$ForwardResult, $AsReverse>>(true);
  });
  // $UseElse
  // $UseExclusion
  it('should flip $AsExcluded to $AsIncluded and vice versa', () => {
    type $ExcludedResult = $FlipOptions<$AsExcluded>;
    type $IncludedResult = $FlipOptions<$AsIncluded>;

    assertType<IsExact<$ExcludedResult, $AsIncluded>>(true);
    assertType<IsExact<$IncludedResult, $AsExcluded>>(true);
  });
  // $UseFilter
  // $UseIdentMap
  // $UseIdents
  // $UseImmutable
  it('should flip $AsImmutable to $AsMutable and vice versa', () => {
    type $ImmutableResult = $FlipOptions<$AsImmutable>;
    type $MutableResult = $FlipOptions<$AsMutable>;

    assertType<IsExact<$ImmutableResult, $AsMutable>>(true);
    assertType<IsExact<$MutableResult, $AsImmutable>>(true);
  });
  // $UseInversion
  it('should flip $AsInverted to $AsUpright and vice versa', () => {
    type $InvertedResult = $FlipOptions<$AsInverted>;
    type $UprightResult = $FlipOptions<$AsUpright>;

    assertType<IsExact<$InvertedResult, $AsUpright>>(true);
    assertType<IsExact<$UprightResult, $AsInverted>>(true);
  });
  // $UseIndices
  // $UseKeys
  // $UsePaths
  // $UseRequired
  it('should flip $AsRequired to $AsOptional and vice versa', () => {
    type $RequiredResult = $FlipOptions<$AsRequired>;
    type $OptionalResult = $FlipOptions<$AsOptional>;

    assertType<IsExact<$RequiredResult, $AsOptional>>(true);
    assertType<IsExact<$OptionalResult, $AsRequired>>(true);
  });
  // $UseSafe
  it('should flip $AsSafe to $AsUnsafe and vice versa', () => {
    type $SafeResult = $FlipOptions<$AsSafe>;
    type $UnsafeResult = $FlipOptions<$AsUnsafe>;

    assertType<IsExact<$SafeResult, $AsUnsafe>>(true);
    assertType<IsExact<$UnsafeResult, $AsSafe>>(true);
  });
  // $UseSetter
  it('should flip $AsSetter to $AsGetter and vice versa', () => {
    type $SetterResult = $FlipOptions<$AsSetter>;
    type $GetterResult = $FlipOptions<$AsGetter>;

    assertType<IsExact<$SetterResult, $AsGetter>>(true);
    assertType<IsExact<$GetterResult, $AsSetter>>(true);
  });
  // $UseStrict
  it('should flip $AsStrict to $AsLoose and vice versa', () => {
    type $StrictResult = $FlipOptions<$AsStrict>;
    type $LooseResult = $FlipOptions<$AsLoose>;

    assertType<IsExact<$StrictResult, $AsLoose>>(true);
    assertType<IsExact<$LooseResult, $AsStrict>>(true);
  });
  // $UseThen


});
