import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { PublicLanguageEffect } from './public-language.effects';
import { publicLanguageReducer } from './public-language.reducer';
import { publicLanguageVariables } from './public-language.variables';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    EffectsModule.forFeature([PublicLanguageEffect]),
    StoreModule.forFeature(
      publicLanguageVariables.stateName,
      publicLanguageReducer.reducer,
    ),
  ],
})
export class PublicLanguageStateModule {}
