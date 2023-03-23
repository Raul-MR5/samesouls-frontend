import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NameMode, NameType, Numero } from '@app/shared/state/common/common-names';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { RolEffect } from './rol.effects';
import { rolNames } from './rol.names';
import { rolReducer } from './rol.reducer';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    EffectsModule.forFeature([RolEffect]),
    StoreModule.forFeature(
      rolNames.getName(NameType.SNAKE_CASE, Numero.PLURAL, NameMode.NORMAL),
      rolReducer.reducer,
    ),
  ],
})
export class RolStateModule {}
