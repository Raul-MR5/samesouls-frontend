import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { AccountService } from '../services/account.service';
import { PublicLanguageStateModule } from '../state/languages/public-language-state.module';
import { ToastUtils } from '../utils/ToastUtils';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

export const PUBLIC_LANGUAGE_STATE = 'PUBLIC_LANGUAGE_STATE';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    PublicLanguageStateModule,

    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
      isolate: true,
    }),
  ],
  exports: [TranslateModule],
  providers: [AccountService, ToastUtils],
})
export class LanguagesModule {}
