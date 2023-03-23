import { Usuario } from '@app/features/components/backoffice/tablas/usuarios/models/usuario.model';
import { NameMode, NameType, Numero } from '@app/shared/state/common/common-names';
import { CommonAction } from '@app/shared/state/common/common.actions';
import { usuarioNames } from './usuario.names';

class UsuarioActions extends CommonAction<Usuario> {
  private static instance: UsuarioActions;

  private constructor() {
    super(usuarioNames.getName(NameType.SNAKE_CASE, Numero.PLURAL, NameMode.NORMAL));
  }

  public static getInstance(): UsuarioActions {
    if (!UsuarioActions.instance) {
      UsuarioActions.instance = new UsuarioActions();
    }
    return UsuarioActions.instance;
  }
}
export const usuarioActions: UsuarioActions = UsuarioActions.getInstance();
