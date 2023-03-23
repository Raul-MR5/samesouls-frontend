import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { BaseFormConfig } from '@app/shared/models/form-config/base-form-config';
import { Subscription } from 'rxjs';
import { BaseFormContainer } from '../../models/form-config/base-form-container';
import { BaseFormFieldConfig } from '../../models/form-config/base-form-field-config';
import { FieldType } from './base-form-container/base-form-container.component';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'base-form',
  templateUrl: './base-form.component.html',
  styleUrls: ['./base-form.component.scss'],
})
export class BaseFormComponent implements OnInit, AfterViewInit {
  @Input() config: BaseFormConfig;

  @Input() form: FormGroup;

  @Output() formChange: EventEmitter<FormGroup> = new EventEmitter<FormGroup>();

  @Input() errors: string[] = [];

  // eslint-disable-next-line @angular-eslint/no-output-on-prefix
  @Output() onButtonClick = new EventEmitter<any>();

  @Input() templates: any[];

  private subscriptions: Subscription[] = [];

  types = FieldType;

  ngAfterViewInit(): void {
    this.subscriptions.push(
      this.form.valueChanges.subscribe(f => {
        this.formChange.emit(this.form);
      }),
    );
  }

  ngOnInit(): void {
    if (this.config) {
      this.config.containers.forEach(container => {
        this.addControl(container);
      });
    }
    this.formChange.emit(this.form);
  }

  private addControl(container: BaseFormContainer) {
    if (container.content.length) {
      container.content.forEach(field => {
        if (this.isField(field)) {
          const f: BaseFormFieldConfig = field as BaseFormFieldConfig;
          this.form.addControl(f.formControlName, new FormControl(f.value, f.validators));
        } else {
          const f: BaseFormContainer = field as BaseFormContainer;
          this.addControl(f);
        }
      });
    }
  }

  isField(content: BaseFormFieldConfig | BaseFormContainer): boolean {
    return !('title' in content);
  }

  buttonEvent(event: any) {
    if (this.onButtonClick) this.onButtonClick.emit(event);
  }
}
