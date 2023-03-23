import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function textContentValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const { value } = control;

    if (!value) {
      return null;
    }

    let valid = true;

    // eslint-disable-next-line no-return-assign
    value?.translations?.forEach(t => (!t.translation ? (valid = false) : null));
    return !valid ? { textContentValidator: true } : null;
  };
}
