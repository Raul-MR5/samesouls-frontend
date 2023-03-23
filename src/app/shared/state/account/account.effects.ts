import { Injectable } from '@angular/core';
import { Permiso } from '@app/features/components/backoffice/tablas/permisos/models/permiso.model';
import { Usuario } from '@app/features/components/backoffice/tablas/usuarios/models/usuario.model';
import { AccountService } from '@app/shared/services/account.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { Action as accountActions } from './account.actions';

@Injectable()
export class AccountEffect {
  constructor(private actions$: Actions, private accountSrv: AccountService) {}

  loadPermisos$ = createEffect(() => this.actions$.pipe(
    ofType(accountActions.loadPermisos),
    mergeMap(() => this.accountSrv.getPermisos().pipe(
      map((permisos: Permiso[]) => accountActions.loadPermisosSuccess({ payload: permisos })),
      catchError((err) => of(accountActions.loadPermisosFail({ error: err }))),
    )),
  ));

  loadUsuario$ = createEffect(() => this.actions$.pipe(
    ofType(accountActions.loadUsuario),
    mergeMap(() => this.accountSrv.getUsuario().pipe(
      map((usuario: Usuario) => accountActions.loadUsuarioSuccess({ payload: usuario })),
      catchError((err) => of(accountActions.loadUsuarioFail({ error: err }))),
    )),
  ));
}
