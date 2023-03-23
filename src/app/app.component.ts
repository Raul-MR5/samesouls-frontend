import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { publicLanguageActions } from '@app/shared/state/languages/public-language.actions';
import { publicLanguageReducer } from '@app/shared/state/languages/public-language.reducer';
import { environment } from '@env/environment';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { PrimeNGConfig } from 'primeng/api';
import { Observable, Subscription } from 'rxjs';
import { filter, take } from 'rxjs/operators';
import { ToastMessage } from './shared/models/toast-message';
import { PublicLanguageState } from './shared/state/languages/public-language.state';
import { ToastUtils } from './shared/utils/ToastUtils';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  isFisrtEmission = true;

  languagesLoaded = false;

  languagesLoading$: Observable<boolean> = this.publicLanguageStore.select(
    publicLanguageReducer.getLoading,
  );

  message$: Observable<ToastMessage> = this.publicLanguageStore
    .select(publicLanguageReducer.getMessage)
    .pipe(filter(i => !!i));

  subscriptions: Subscription[] = [];

  constructor(
    private config: PrimeNGConfig,
    private translateSrv: TranslateService,
    private publicLanguageStore: Store<PublicLanguageState>,
    private router: Router,
    private toastUtils: ToastUtils,
  ) {}

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  ngOnInit() {
    console.log('BASE corriendo con la configuración: ', environment.name);
    this.initCss();

    // const messageSubscription = this.message$.subscribe(
    //   async (message: ToastMessage) => {
    //     const res = await this.toastUtils.messageHandler(
    //       'language',
    //       MessageHandlerType.HIDE_MODAL,
    //       message,
    //     );
    //   },
    // );
    // this.subscriptions.push(messageSubscription);

    this.translateSrv.onLangChange.subscribe(lang => {
      this.config.setTranslation(this.translateSrv.instant('calendar'));
    });

    this.configLanguages();
  }

  async configLanguages() {
    this.publicLanguageStore.dispatch(
      publicLanguageActions.loadAll({
        payload: {
          size: 10000,
          page: 0,
          sort: [],
          filter: [
            {
              field: 'active',
              value: true,
            },
          ],
        },
      }),
    );

    this.publicLanguageStore
      .select(publicLanguageReducer.getOne)
      .pipe(filter(i => !!i))
      .subscribe(language => {
        this.translateSrv.use(language.siglas);
      });

    this.publicLanguageStore
      .select(publicLanguageReducer.getAll)
      .pipe(
        filter(l => (l ? !!l.length : false)),
        take(1),
      )
      .subscribe(languages => {
        this.languagesLoaded = true;
        const navigatorLang = navigator.language;
        const siglasNavigatorLang = navigatorLang.split('-')[0];
        const language = languages.find(language => language.siglas === siglasNavigatorLang);
        this.publicLanguageStore.dispatch(
          publicLanguageActions.loadOneSuccess({
            payload: language || languages[0],
          }),
        );
      });
  }

  changeCss(type) {
    switch (type) {
      case 'public':
        document.body.style.maxHeight = '100vh';
        break;
      case 'backoffice':
        document.body.style.maxHeight = '100%';
        break;
    }
  }

  initCss = () => {
    this.router.events.pipe(filter(event => 'url' in event)).subscribe((event: any) => {
      const nav = event.url.split('/');
      if (nav[1]) {
        switch (nav[1]) {
          case 'public':
            if (this.isFisrtEmission) {
              this.isFisrtEmission = false;
            }
            this.changeCss('public');
            localStorage.removeItem('usuario');

            document.body.style.maxHeight = '100vh';
            // document.body.style.height = '100px';
            document.body.style.overflowY = 'hidden';
            break;
          case 'backoffice':
            this.changeCss('backoffice');
            document.body.style.overflowY = 'scroll';
            document.body.style.maxHeight = '100%';
            break;
        }
      }
    });
  };
}
