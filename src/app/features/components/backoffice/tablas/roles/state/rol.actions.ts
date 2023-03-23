import { Rol } from '@app/features/components/backoffice/tablas/roles/models/rol.model';
import { NameMode, NameType, Numero } from '@app/shared/state/common/common-names';
import { CommonAction } from '@app/shared/state/common/common.actions';
import { rolNames } from './rol.names';

class RolActions extends CommonAction<Rol> {
  private static instance: RolActions;

  private constructor() {
    super(rolNames.getName(NameType.SNAKE_CASE, Numero.PLURAL, NameMode.NORMAL));
  }

  public static getInstance(): RolActions {
    if (!RolActions.instance) {
      RolActions.instance = new RolActions();
    }
    return RolActions.instance;
  }
}
export const rolActions: RolActions = RolActions.getInstance();
