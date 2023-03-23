import { NameMode, NameType, Numero } from '@app/shared/state/common/common-names';
import { CommonAction } from '@app/shared/state/common/common.actions';
import { Language } from '../models/language.model';
import { languageNames } from './language.names';

class LanguageActions extends CommonAction<Language> {
  private static instance: LanguageActions;

  private constructor() {
    super(languageNames.getName(NameType.SNAKE_CASE, Numero.PLURAL, NameMode.NORMAL));
  }

  public static getInstance(): LanguageActions {
    if (!LanguageActions.instance) {
      LanguageActions.instance = new LanguageActions();
    }
    return LanguageActions.instance;
  }
}

export const languageActions: LanguageActions = LanguageActions.getInstance();
