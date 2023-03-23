import { Injectable } from '@angular/core';
import { Menu } from '@app/features/components/backoffice/tablas/menus/models/menu.model';
import { MenuService } from '@app/features/components/backoffice/tablas/menus/services/menu.service';
import { CommonEffect } from '@app/shared/state/common/common.effects';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, exhaustMap, map } from 'rxjs/operators';
import { menuSidebarActions } from './menu-sidebar.actions';

@Injectable()
export class MenuSidebarEffect extends CommonEffect<Menu> {
  constructor(protected override actions$: Actions, protected menuSrv: MenuService) {
    super(actions$, menuSidebarActions, menuSrv);
  }

  loadAllByUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(menuSidebarActions.loadAllByUser),
      exhaustMap(() =>
        this.menuSrv.getMenusByUser().pipe(
          map((page: Menu[]) => menuSidebarActions.loadAllByUserSuccess({ payload: page })),
          catchError(err => of(menuSidebarActions.loadAllByUserFail({ error: err }))),
        ),
      ),
    ),
  );
}
