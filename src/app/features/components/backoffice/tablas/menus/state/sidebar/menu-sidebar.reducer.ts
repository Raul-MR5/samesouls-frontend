import { ToastMessageType } from '@app/shared/models/toast-message';
import { CommonReducer } from '@app/shared/state/common/common.reducer';
import { on, ReducerTypes } from '@ngrx/store';
import { Menu } from '../../models/menu.model';
import { menuSidebarActions } from './menu-sidebar.actions';
import { MenuSidebarState } from './menu-sidebar.state';
import { menuSidebarVariables } from './menu-sidebar.variables';

const initialState: MenuSidebarState = {
  entities: [],
  selectedId: null,
  count: 0,
  loading: false,
  message: null,
};
const otherReducers: ReducerTypes<any, any>[] = [
  on(menuSidebarActions.loadAllByUser, (state) => ({
    ...state,
    loading: true,
  })),
  on(menuSidebarActions.loadAllByUserSuccess, (state, { payload }) => ({
    ...state,
    entities: payload,
    count: payload.length,
    loading: false,
    message: {
      type: ToastMessageType.LOAD_ALL,
      error: null,
    },
  })),
  on(menuSidebarActions.loadAllByUserFail, (state, { error }) => ({
    ...state,
    loading: false,
    message: {
      type: ToastMessageType.ERROR,
      error,
    },
  })),
];
class MenuSidebarReducer extends CommonReducer<Menu, MenuSidebarState> {
  private static instance: MenuSidebarReducer;

  private constructor() {
    super(
      menuSidebarVariables.stateName,
      menuSidebarActions,
      initialState,
      otherReducers,
    );
  }

  public static getInstance(): MenuSidebarReducer {
    if (!MenuSidebarReducer.instance) {
      MenuSidebarReducer.instance = new MenuSidebarReducer();
    }
    return MenuSidebarReducer.instance;
  }
}
export const menuSidebarReducer: MenuSidebarReducer = MenuSidebarReducer.getInstance();
