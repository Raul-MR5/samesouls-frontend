/* eslint-disable @typescript-eslint/no-shadow */
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Language } from '@app/features/components/backoffice/tablas/languages/models/language.model';
import { publicLanguageReducer } from '@app/shared/state/languages/public-language.reducer';
import { PublicLanguageState } from '@app/shared/state/languages/public-language.state';
import { Store } from '@ngrx/store';
import { filter, take } from 'rxjs/operators';
import { TextContent } from './models/text-content.model';
import { TranslateInputEvent } from './models/translate-input-event.model';
import { TranslateInputType } from './models/translate-input-type.model';

@Component({
  selector: 'app-translate-input',
  templateUrl: 'translate-input.component.html',
  styleUrls: ['translate-input.component.scss'],
})
export class TranslateInputComponent implements OnInit, OnDestroy {
  visibility = false;

  languages: Language[] = [];

  language: Language;

  publicLanguage: Language;

  errores: string[] = [];

  @Input() fieldName: string;

  @Input() type: TranslateInputType = TranslateInputType.INPUT;

  @Input() value: TextContent;

  @Input() disabled = false;

  @Output() translateInputChange = new EventEmitter<TranslateInputEvent>();

  form: FormGroup = this.formBuilder.group({
    id: [undefined],
    translations: this.formBuilder.array([]),
  });

  constructor(
    private publicLanguageStore: Store<PublicLanguageState>,
    private formBuilder: FormBuilder,
  ) {}

  ngOnDestroy(): void {
    const elements = document.getElementsByClassName('p-component-overlay-leave');
    Array.from(elements).forEach(el => {
      el.remove();
    });
  }

  onHide() {
    Object.values(this.form?.controls).forEach(control => {
      control.markAsDirty();
    });
    this.translations.controls.forEach((formGroup: FormGroup) => {
      Object.values(formGroup.controls).forEach(control => {
        control.markAsDirty();
      });
    });
    if (this.form.valid) {
      this.changeVisibility(false);
    }
  }

  ngOnInit(): void {
    this.form.patchValue({
      id: this.value?.id,
      translations: [],
    });
    this.form.valueChanges.subscribe((textContent: TextContent) => {
      this.translateInputChange.emit({
        actualTranslation: textContent.translations.find(
          t => t.language.siglas === this.publicLanguage?.siglas,
        )?.translation,
        translateInput: textContent,
        valid: this.form.valid,
      });
    });

    this.publicLanguageStore.select(publicLanguageReducer.getAll).subscribe(languages => {
      this.languages = languages;
      this.languages.forEach(language => {
        const translation = this.value?.translations.find(
          t => t.language.siglas === language.siglas,
        );
        const languageForm = this.formBuilder.group({
          id: [translation?.id],
          language: [language, [Validators.required]],
          translation: [translation?.translation, [Validators.required]],
          textContent: [translation?.textContent],
        });
        this.translations.push(languageForm);
      });
    });
    this.publicLanguageStore
      .select(publicLanguageReducer.getOne)
      .pipe(
        take(1),
        filter(i => !!i),
      )
      .subscribe(language => {
        this.language = language;
      });
    this.publicLanguageStore
      .select(publicLanguageReducer.getOne)
      .pipe(filter(i => !!i))
      .subscribe(language => {
        this.publicLanguage = language;
      });
  }

  changeVisibility(visibility: boolean) {
    this.visibility = visibility;
  }

  getTraduction(language: string) {
    const translation = this.value.translations.find(
      translation => translation.language.siglas === language,
    );
    if (translation) {
      return translation.translation;
    }
    return null;
  }

  getActualTranslationControl() {
    return this.translations.controls.find(
      translationForm => translationForm.get('language').value.siglas === this.language.siglas,
    );
  }

  getActualTranslationInvalid() {
    const translation = this.getActualTranslationControl();
    return translation ? translation.invalid : false;
  }

  getActualTranslationDirty() {
    const translation = this.getActualTranslationControl();
    return translation ? translation.dirty : false;
  }

  getActualTranslation() {
    const translation = this.getActualTranslationControl();
    return translation ? translation.value.translation : 'SIN TRADUCCIÓN';
  }

  onActualTranslationChange(event: any) {
    const translation = this.getActualTranslationControl();
    translation.patchValue({
      id: translation.value.id,
      language: translation.value.language,
      translation: event.target.value,
      textContent: translation.value.textContent,
    });
    translation.markAsDirty();
  }

  get translations() {
    return this.form.get('translations') as FormArray<FormGroup>;
  }
}
