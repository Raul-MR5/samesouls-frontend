import { NameMode, NameType, Numero } from '@app/shared/state/common/common-names';
import { CommonReducer } from '@app/shared/state/common/common.reducer';
import { ReducerTypes } from '@ngrx/store';
import { Usuario } from '../models/usuario.model';
import { usuarioActions } from './usuario.actions';
import { usuarioNames } from './usuario.names';
import { UsuarioState } from './usuario.state';

const initialState: UsuarioState = {
  entities: [],
  selectedId: null,
  count: 0,
  loading: false,
  message: null,
};
const otherReducers: ReducerTypes<any, any>[] = [];
class UsuarioReducer extends CommonReducer<Usuario, UsuarioState> {
  private static instance: UsuarioReducer;

  private constructor() {
    super(
      usuarioNames.getName(NameType.SNAKE_CASE, Numero.PLURAL, NameMode.NORMAL),
      usuarioActions,
      initialState,
      otherReducers,
    );
  }

  public static getInstance(): UsuarioReducer {
    if (!UsuarioReducer.instance) {
      UsuarioReducer.instance = new UsuarioReducer();
    }
    return UsuarioReducer.instance;
  }
}
export const usuarioReducer: UsuarioReducer = UsuarioReducer.getInstance();
