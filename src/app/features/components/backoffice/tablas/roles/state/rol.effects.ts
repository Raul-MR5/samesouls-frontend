import { Injectable } from '@angular/core';
import { Rol } from '@app/features/components/backoffice/tablas/roles/models/rol.model';
import { RolService } from '@app/features/components/backoffice/tablas/roles/services/rol.service';
import { CommonEffect } from '@app/shared/state/common/common.effects';
import { Actions } from '@ngrx/effects';
import { rolActions } from './rol.actions';

@Injectable()
export class RolEffect extends CommonEffect<Rol> {
  constructor(protected override actions$: Actions, protected rolSrv: RolService) {
    super(actions$, rolActions, rolSrv);
  }
}
