import { Permiso } from '@app/features/components/backoffice/tablas/permisos/models/permiso.model';
import { NameMode, NameType, Numero } from '@app/shared/state/common/common-names';
import { CommonAction } from '@app/shared/state/common/common.actions';
import { permisoNames } from './permiso.names';

class PermisoActions extends CommonAction<Permiso> {
  private static instance: PermisoActions;

  private constructor() {
    super(permisoNames.getName(NameType.SNAKE_CASE, Numero.PLURAL, NameMode.NORMAL));
  }

  public static getInstance(): PermisoActions {
    if (!PermisoActions.instance) {
      PermisoActions.instance = new PermisoActions();
    }
    return PermisoActions.instance;
  }
}
export const permisoActions: PermisoActions = PermisoActions.getInstance();
