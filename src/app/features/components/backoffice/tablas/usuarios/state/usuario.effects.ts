import { Injectable } from '@angular/core';
import { Usuario } from '@app/features/components/backoffice/tablas/usuarios/models/usuario.model';
import { UsuarioService } from '@app/features/components/backoffice/tablas/usuarios/services/usuario.service';
import { CommonEffect } from '@app/shared/state/common/common.effects';
import { Actions } from '@ngrx/effects';
import { usuarioActions } from './usuario.actions';

@Injectable()
export class UsuarioEffect extends CommonEffect<Usuario> {
  constructor(protected override actions$: Actions, protected usuarioSrv: UsuarioService) {
    super(actions$, usuarioActions, usuarioSrv);
  }
}
