import { Injectable } from '@angular/core';
import { Language } from '@app/features/components/backoffice/tablas/languages/models/language.model';
import { LanguageService } from '@app/features/components/backoffice/tablas/languages/services/language.service';
import { CommonEffect } from '@app/shared/state/common/common.effects';
import { Actions } from '@ngrx/effects';
import { publicLanguageActions } from './public-language.actions';

@Injectable()
export class PublicLanguageEffect extends CommonEffect<Language> {
  constructor(protected override actions$: Actions, protected languageSrv: LanguageService) {
    super(actions$, publicLanguageActions, languageSrv);
  }
}
