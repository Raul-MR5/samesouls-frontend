import { Injectable } from '@angular/core';
import { Permiso } from '@app/features/components/backoffice/tablas/permisos/models/permiso.model';
import { PermisoService } from '@app/features/components/backoffice/tablas/permisos/services/permiso.service';
import { CommonEffect } from '@app/shared/state/common/common.effects';
import { Actions } from '@ngrx/effects';
import { permisoActions } from './permiso.actions';

@Injectable()
export class PermisoEffect extends CommonEffect<Permiso> {
  constructor(protected override actions$: Actions, protected permisoSrv: PermisoService) {
    super(actions$, permisoActions, permisoSrv);
  }
}
