import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NameMode, NameType, Numero } from '@app/shared/state/common/common-names';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { MenuEffect } from './menu.effects';
import { menuNames } from './menu.names';
import { menuReducer } from './menu.reducer';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    EffectsModule.forFeature([MenuEffect]),
    StoreModule.forFeature(
      menuNames.getName(NameType.SNAKE_CASE, Numero.PLURAL, NameMode.NORMAL),
      menuReducer.reducer,
    ),
  ],
})
export class MenuStateModule {}
