import { BaseFormFieldConfig } from './base-form-field-config';

export interface BaseFormContainer {
  title: string;
  code: string;
  width?: string;
  content: (BaseFormFieldConfig | BaseFormContainer)[];
}
