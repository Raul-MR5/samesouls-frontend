import { NameMode, NameType, Numero } from '@app/shared/state/common/common-names';
import { CommonReducer } from '@app/shared/state/common/common.reducer';
import { ReducerTypes } from '@ngrx/store';
import { Rol } from '../models/rol.model';
import { rolActions } from './rol.actions';
import { rolNames } from './rol.names';
import { RolState } from './rol.state';

const initialState: RolState = {
  entities: [],
  selectedId: null,
  count: 0,
  loading: false,
  message: null,
};
const otherReducers: ReducerTypes<any, any>[] = [];
class RolReducer extends CommonReducer<Rol, RolState> {
  private static instance: RolReducer;

  private constructor() {
    super(
      rolNames.getName(NameType.SNAKE_CASE, Numero.PLURAL, NameMode.NORMAL),
      rolActions,
      initialState,
      otherReducers,
    );
  }

  public static getInstance(): RolReducer {
    if (!RolReducer.instance) {
      RolReducer.instance = new RolReducer();
    }
    return RolReducer.instance;
  }
}
export const rolReducer: RolReducer = RolReducer.getInstance();
