import { Menu } from '@app/features/components/backoffice/tablas/menus/models/menu.model';
import { CommonAction } from '@app/shared/state/common/common.actions';
import { createAction, props } from '@ngrx/store';

class MenuSidebarActions extends CommonAction<Menu> {
  private static instance: MenuSidebarActions;

  private constructor() {
    super('MenuSidebar');
  }

  public static getInstance(): MenuSidebarActions {
    if (!MenuSidebarActions.instance) {
      MenuSidebarActions.instance = new MenuSidebarActions();
    }
    return MenuSidebarActions.instance;
  }

  // LOAD EDIFICIOS CERCANOS
  loadAllByUser = createAction(`[${this.entityName}] Load All By User`);

  loadAllByUserSuccess = createAction(
    `[${this.entityName}] Load All By User Success`,
    props<{ payload: any }>(),
  );

  loadAllByUserFail = createAction(
    `[${this.entityName}] Load All By User Fail`,
    props<{ error: any }>(),
  );
}
export const menuSidebarActions: MenuSidebarActions = MenuSidebarActions.getInstance();
