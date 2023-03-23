import { Language } from '@app/features/components/backoffice/tablas/languages/models/language.model';
import { CommonAction } from '@app/shared/state/common/common.actions';
import { publicLanguageVariables } from './public-language.variables';

class PublicLanguageActions extends CommonAction<Language> {
  private static instance: PublicLanguageActions;

  private constructor() {
    super(publicLanguageVariables.entityName);
  }

  public static getInstance(): PublicLanguageActions {
    if (!PublicLanguageActions.instance) {
      PublicLanguageActions.instance = new PublicLanguageActions();
    }
    return PublicLanguageActions.instance;
  }
}

export const publicLanguageActions: PublicLanguageActions = PublicLanguageActions.getInstance();
