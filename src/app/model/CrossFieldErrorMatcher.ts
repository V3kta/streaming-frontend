import { FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

export class CrossFieldErrorMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    const invalidControl = !!(
      control &&
      control.invalid &&
      control.parent.dirty
    );

    const invalidParent = !!(
      control &&
      control.parent &&
      control.parent.invalid &&
      control.parent.dirty
    );

    return (
      control.parent.errors &&
      control.parent.errors &&
      control.touched &&
      (invalidControl || invalidParent)
    );
  }
}
