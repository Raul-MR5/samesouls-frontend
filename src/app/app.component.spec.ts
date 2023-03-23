import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { environment } from '@env/environment';
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
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { ErrorInterceptor } from './core/helpers/error.interceptor';
import { JwtInterceptor } from './core/helpers/jwt.interceptor';
import { LanguageInterceptor } from './core/helpers/language.interceptor';
import { MenuService } from './core/layout/public/sidebar/menu/menu.service';
import { EdificioStateModule } from './features/components/backoffice/tablas/edificios/state/edificio-state.module';
import { EventoStateModule } from './features/components/backoffice/tablas/eventos/state/evento-state.module';
import { ItinerarioStateModule } from './features/components/backoffice/tablas/itinerarios/state/itinerario-state.module';
import { PeriodoStateModule } from './features/components/backoffice/tablas/periodos/state/periodo-state.module';
import { TipologiaStateModule } from './features/components/backoffice/tablas/tipologias/state/tipologia-state.module';
import { MobileViewModule } from './features/components/public/mobile-view/mobile-view.module';
import { ErrorPageModule } from './shared/components/error-page/error-page.module';
import { LoadingDataModule } from './shared/components/loading-data/loading-data.module';
import { AccountModule } from './shared/modules/account.module';
import { LanguagesModule } from './shared/modules/languages.module';
import { PublicLanguageStateModule } from './shared/state/languages/public-language-state.module';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/');
}

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
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
        EdificioStateModule,
        MobileViewModule,
        ErrorPageModule,
        LoadingDataModule,

        EdificioStateModule,
        ItinerarioStateModule,
        EventoStateModule,
        TipologiaStateModule,
        PeriodoStateModule,
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
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
