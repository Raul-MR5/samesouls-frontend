import { Menu } from '@app/features/components/backoffice/tablas/menus/models/menu.model';
import { NameMode, NameType, Numero } from '@app/shared/state/common/common-names';
import { CommonAction } from '@app/shared/state/common/common.actions';
import { menuNames } from './menu.names';

class MenuActions extends CommonAction<Menu> {
  private static instance: MenuActions;

  private constructor() {
    super(menuNames.getName(NameType.SNAKE_CASE, Numero.PLURAL, NameMode.NORMAL));
  }

  public static getInstance(): MenuActions {
    if (!MenuActions.instance) {
      MenuActions.instance = new MenuActions();
    }
    return MenuActions.instance;
  }
}
export const menuActions: MenuActions = MenuActions.getInstance();
