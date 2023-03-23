import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NameMode, NameType, Numero } from '@app/shared/state/common/common-names';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { LanguageEffect } from './language.effects';
import { languageNames } from './language.names';
import { languageReducer } from './language.reducer';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    EffectsModule.forFeature([LanguageEffect]),
    StoreModule.forFeature(
      languageNames.getName(NameType.SNAKE_CASE, Numero.PLURAL, NameMode.NORMAL),
      languageReducer.reducer,
    ),
  ],
})
export class LanguageStateModule {}
