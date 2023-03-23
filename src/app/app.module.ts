import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Geolocation } from '@awesome-cordova-plugins/geolocation/ngx';
// import { DefaultDataServiceConfig, EntityDataModule } from '@ngrx/data';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { ConfirmationService, MessageService, PrimeNGConfig } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { environment } from 'src/environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ErrorInterceptor } from './core/helpers/error.interceptor';
import { JwtInterceptor } from './core/helpers/jwt.interceptor';
import { LanguageInterceptor } from './core/helpers/language.interceptor';
// import { PluralHttpUrlGenerator } from './core/helpers/plural-http-url-generator';
import { MenuService } from './core/layout/backoffice/sidebar/menu/menu.service';
import { PublicModule } from './core/layout/public/public.module';
import { ErrorPageModule } from './shared/components/error-page/error-page.module';
import { LoadingDataModule } from './shared/components/loading-data/loading-data.module';
import { AccountModule } from './shared/modules/account.module';
import { LanguagesModule } from './shared/modules/languages.module';
import { PublicLanguageStateModule } from './shared/state/languages/public-language-state.module';

// const defaultDataServiceConfig: DefaultDataServiceConfig = {
//   root: environment.apiUrl,
//   timeout: 3000,
// };

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/');
}
@NgModule({
  declarations: [AppComponent],
  imports: [
    ToastModule,
    ButtonModule,
    InputTextModule,
    BrowserModule,
    ConfirmDialogModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AccountModule,
    LanguagesModule,
    ErrorPageModule,
    LoadingDataModule,

    PublicLanguageStateModule,

    StoreModule.forRoot({}, {}),
    EffectsModule.forRoot([]),
    environment.production ? [] : StoreDevtoolsModule.instrument(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
    PublicModule,

    // EntityDataModule.forRoot(entityConfig),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: LanguageInterceptor, multi: true },
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    MenuService,
    MessageService,
    ConfirmationService,
    PrimeNGConfig,
    Geolocation,
  ],

  bootstrap: [AppComponent],
})
export class AppModule {}
