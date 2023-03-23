import { Injectable } from '@angular/core';
import { Menu } from '@app/features/components/backoffice/tablas/menus/models/menu.model';
import { MenuService } from '@app/features/components/backoffice/tablas/menus/services/menu.service';
import { CommonEffect } from '@app/shared/state/common/common.effects';
import { Actions } from '@ngrx/effects';
import { menuActions } from './menu.actions';

@Injectable()
export class MenuEffect extends CommonEffect<Menu> {
  constructor(protected override actions$: Actions, protected menuSrv: MenuService) {
    super(actions$, menuActions, menuSrv);
  }
}
