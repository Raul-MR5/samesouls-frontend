import { Usuario } from '@app/features/components/backoffice/tablas/usuarios/models/usuario.model';
import { createAction, props } from '@ngrx/store';

export class Action {
  static entityName = 'Account';

  // LOAD ALL
  static loadPermisos = createAction(
    `[${Action.entityName}] Load Permisos`,
  );

  static loadPermisosSuccess = createAction(
    `[${Action.entityName}] Load Permisos Success`,
    props<{ payload: any[] }>(),
  );

  static loadPermisosFail = createAction(
    `[${Action.entityName}] Load Permisos Fail`,
    props<{ error: any }>(),
  );

  // LOAD ONE
  static loadUsuario = createAction(`[${Action.entityName}] Load Usuario`);

  static loadUsuarioSuccess = createAction(
    `[${Action.entityName}] Load Usuario Success`,
    props<{ payload: Usuario }>(),
  );

  static loadUsuarioFail = createAction(
    `[${Action.entityName}] Load Usuario Fail`,
    props<{ error: any }>(),
  );
}
