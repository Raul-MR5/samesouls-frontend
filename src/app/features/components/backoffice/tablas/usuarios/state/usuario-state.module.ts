import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NameMode, NameType, Numero } from '@app/shared/state/common/common-names';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { UsuarioEffect } from './usuario.effects';
import { usuarioNames } from './usuario.names';
import { usuarioReducer } from './usuario.reducer';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,

    EffectsModule.forFeature([UsuarioEffect]),
    StoreModule.forFeature(
      usuarioNames.getName(NameType.SNAKE_CASE, Numero.PLURAL, NameMode.NORMAL),
      usuarioReducer.reducer,
    ),
  ],
})
export class UsuarioStateModule {}
