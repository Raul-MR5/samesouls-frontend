/* eslint-disable @angular-eslint/component-selector */
import { Component, Input } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { BaseFormFieldConfig } from '@app/shared/models/form-config/base-form-field-config';
import { BaseFormContainer } from '../../../models/form-config/base-form-container';

export enum FieldType {
  TEXT = 'text',
  DATE = 'date',
  DATETIME = 'datetime',
  BOOLEAN = 'boolean',
  NUMBER = 'number',
  MONEY = 'money',
  EMAIL = 'email',
  PASSWORD = 'password',
  SELECT = 'select',
  SELECT_CUSTOM = 'select_custom',
  MULTISELECT = 'multiselect',
  MULTISELECT_CUSTOM = 'multiselect_custom',
  TABLE = 'table',
}

@Component({
  selector: 'base-form-container',
  templateUrl: './base-form-container.component.html',
  styleUrls: ['./base-form-container.component.scss'],
})
export class BaseFormContainerComponent {
  @Input() container: any;

  @Input() level = 0;

  @Input() errors: string[] = [];

  @Input() formGroup: FormGroup;

  @Input() templates: any[];

  types = FieldType;

  isField(content: BaseFormFieldConfig | BaseFormContainer): boolean {
    return !('title' in content);
  }

  required(control: string) {
    if (control && this.formGroup.get(control).validator) {
      const validator = this.formGroup.get(control).validator({} as AbstractControl);
      if (validator && validator['required']) return true;
    }
    return false;
  }
}
