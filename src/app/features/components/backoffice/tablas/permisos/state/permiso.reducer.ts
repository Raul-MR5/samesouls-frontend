import { NameMode, NameType, Numero } from '@app/shared/state/common/common-names';
import { CommonReducer } from '@app/shared/state/common/common.reducer';
import { ReducerTypes } from '@ngrx/store';
import { Permiso } from '../models/permiso.model';
import { permisoActions } from './permiso.actions';
import { permisoNames } from './permiso.names';
import { PermisoState } from './permiso.state';

const initialState: PermisoState = {
  entities: [],
  selectedId: null,
  count: 0,
  loading: false,
  message: null,
};
const otherReducers: ReducerTypes<any, any>[] = [];
class PermisoReducer extends CommonReducer<Permiso, PermisoState> {
  private static instance: PermisoReducer;

  private constructor() {
    super(
      permisoNames.getName(NameType.SNAKE_CASE, Numero.PLURAL, NameMode.NORMAL),
      permisoActions,
      initialState,
      otherReducers,
    );
  }

  public static getInstance(): PermisoReducer {
    if (!PermisoReducer.instance) {
      PermisoReducer.instance = new PermisoReducer();
    }
    return PermisoReducer.instance;
  }
}
export const permisoReducer: PermisoReducer = PermisoReducer.getInstance();
