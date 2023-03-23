import { Language } from '@app/features/components/backoffice/tablas/languages/models/language.model';
import { CommonReducer } from '@app/shared/state/common/common.reducer';
import { ReducerTypes } from '@ngrx/store';
import { publicLanguageActions } from './public-language.actions';
import { PublicLanguageState } from './public-language.state';
import { publicLanguageVariables } from './public-language.variables';

export const initialState: PublicLanguageState = {
  entities: [],
  selectedId: undefined,
  count: 0,
  loading: false,
  message: undefined,
};
const otherReducers: ReducerTypes<any, any>[] = [];
class PublicLanguageReducer extends CommonReducer<Language, PublicLanguageState> {
  private static instance: PublicLanguageReducer;

  private constructor() {
    super(publicLanguageVariables.stateName, publicLanguageActions, initialState, otherReducers);
  }

  public static getInstance(): PublicLanguageReducer {
    if (!PublicLanguageReducer.instance) {
      PublicLanguageReducer.instance = new PublicLanguageReducer();
    }
    return PublicLanguageReducer.instance;
  }
}
export const publicLanguageReducer: PublicLanguageReducer = PublicLanguageReducer.getInstance();
