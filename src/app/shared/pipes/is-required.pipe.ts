import { Pipe, PipeTransform } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';

@Pipe({
  name: 'isRequired',
})
export class IsRequiredPipe implements PipeTransform {
  transform(field: string, form: FormGroup): string {
    const formField = form.get(field);
    let res = '';
    if (!formField.validator) {
      return res;
    }

    const validator = formField.validator({} as AbstractControl);
    if (validator && validator['required']) {
      res = '*';
    }
    return res;
  }
}
