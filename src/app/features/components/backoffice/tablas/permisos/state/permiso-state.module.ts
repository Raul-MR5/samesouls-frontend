import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NameMode, NameType, Numero } from '@app/shared/state/common/common-names';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { PermisoEffect } from './permiso.effects';
import { permisoNames } from './permiso.names';
import { permisoReducer } from './permiso.reducer';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    EffectsModule.forFeature([PermisoEffect]),
    StoreModule.forFeature(
      permisoNames.getName(NameType.SNAKE_CASE, Numero.PLURAL, NameMode.NORMAL),
      permisoReducer.reducer,
    ),
  ],
})
export class PermisoStateModule {}
