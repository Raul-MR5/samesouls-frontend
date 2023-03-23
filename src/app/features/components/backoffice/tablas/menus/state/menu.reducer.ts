import { NameMode, NameType, Numero } from '@app/shared/state/common/common-names';
import { CommonReducer } from '@app/shared/state/common/common.reducer';
import { ReducerTypes } from '@ngrx/store';
import { Menu } from '../models/menu.model';
import { menuActions } from './menu.actions';
import { menuNames } from './menu.names';
import { MenuState } from './menu.state';

const initialState: MenuState = {
  entities: [],
  selectedId: null,
  count: 0,
  loading: false,
  message: null,
};
const otherReducers: ReducerTypes<any, any>[] = [];
class MenuReducer extends CommonReducer<Menu, MenuState> {
  private static instance: MenuReducer;

  private constructor() {
    super(
      menuNames.getName(NameType.SNAKE_CASE, Numero.PLURAL, NameMode.NORMAL),
      menuActions,
      initialState,
      otherReducers,
    );
  }

  public static getInstance(): MenuReducer {
    if (!MenuReducer.instance) {
      MenuReducer.instance = new MenuReducer();
    }
    return MenuReducer.instance;
  }
}
export const menuReducer: MenuReducer = MenuReducer.getInstance();
