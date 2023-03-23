import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalMode, ModalParams } from '@app/shared/models/modal-config/modal-mode';
import { ToastMessage } from '@app/shared/models/toast-message';
import * as fromAccount from '@app/shared/state/account/account.reducer';
import { MessageHandlerType, ToastUtils } from '@app/shared/utils/ToastUtils';
import { Utils } from '@app/shared/utils/Utils';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Observable, Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { Language } from '../models/language.model';
import { languageActions } from '../state/language.actions';
import { languageReducer } from '../state/language.reducer';
import { LanguageState } from '../state/language.state';

@Component({
  selector: 'app-language-modal',
  templateUrl: './language-modal.component.html',
  styleUrls: ['./language-modal.component.scss'],
})
export class LanguageModalComponent implements OnInit, OnDestroy {
  visible = false;

  loading$: Observable<boolean> = this.store.select(languageReducer.getLoading);

  language$: Observable<Language> = this.store.select(languageReducer.getOne);

  message$: Observable<ToastMessage> = this.store
    .select(languageReducer.getMessage)
    .pipe(filter(i => !!i));

  errores: string[] = [];

  form: FormGroup;

  es: any;

  modalMode: ModalMode;

  prepared = false;

  submitB = false;

  subscriptions: Subscription[] = [];

  constructor(
    private store: Store<LanguageState>,
    private toastSrv: MessageService,
    private formBuilder: FormBuilder,
    private router: Router,
    private accountStore: Store<fromAccount.AppState>,
    private translateSrv: TranslateService,
    private confirmationSrv: ConfirmationService,
    private messageSrv: MessageService,
    private route: ActivatedRoute,
    private toastUtils: ToastUtils,
  ) {
    this.translateSrv.setDefaultLang('es');
    this.route.params.subscribe((params: ModalParams) => {
      if (params.modalMode) {
        switch (params.modalMode) {
          case 'VIEW':
            this.show(ModalMode.VIEW);
            break;
          case 'UPDATE':
            this.show(ModalMode.UPDATE);
            break;
          case 'CREATE':
            this.show(ModalMode.CREATE);
            break;
          default:
            this.show(ModalMode.VIEW);
            break;
        }
        if (params.modalMode !== 'CREATE') {
          this.store.dispatch(languageActions.loadOne({ id: Number(params.id) }));
        }
      }
    });
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  ngOnInit(): void {
    this.translate('es');
    this.form = this.formBuilder.group({
      id: [null],
    });

    const languageSubscription: Subscription = this.language$.subscribe(language => {
      this.patchValue(language);
    });
    this.subscriptions.push(languageSubscription);

    const messageSubscription = this.message$.subscribe(async (message: ToastMessage) => {
      const res = await this.toastUtils.messageHandler(
        'language',
        MessageHandlerType.HIDE_MODAL,
        message,
      );
      if (res !== null) {
        this.visible = res;
      }
    });
    this.subscriptions.push(messageSubscription);
  }

  translate(lang: string) {
    this.translateSrv.use(lang);
  }

  show(modalMode: ModalMode) {
    this.patchValue(null);
    this.modalMode = modalMode;
    if (modalMode === ModalMode.CREATE) {
      this.store.dispatch(languageActions.unload());
    }

    this.visible = true;
  }

  onHide() {
    this.visible = false;
    this.errores = [];
    this.store.dispatch(languageActions.unload());
    this.form.reset();
    this.submitB = false;
    this.router.navigate(['backoffice', 'languages']);
  }

  patchValue(language: Language) {
    if (!this.form) {
      return;
    }
    if (language) {
      this.form.patchValue({
        id: language.id,
      });
    } else {
      this.form.patchValue({
        id: null,
      });
    }
  }

  send() {
    this.submitB = true;
    Object.values(this.form?.controls).forEach(control => {
      control.markAsDirty();
    });
    if (this.form.invalid) {
      this.toastSrv.add({
        severity: 'warn',
        summary: 'Error',
        detail: this.translateSrv.instant('user.modal.invalid'),
      });
      const errorCampo = this.translateSrv.instant('language.modal.error');
      // eslint-disable-next-line no-restricted-syntax, guard-for-in
      for (const name in this.form?.controls) {
        const control = this.form?.controls[name];
        const nameTrad = this.translateSrv.instant(`columns.${name}`);

        if (
          (control.invalid && control.value === '') ||
          (control.invalid && control.value === null)
        ) {
          this.errores[name] = errorCampo + nameTrad;
        }
      }
      return;
    }

    switch (this.modalMode) {
      case ModalMode.CREATE:
        this.store.dispatch(languageActions.create({ payload: this.form.value }));
        break;
      case ModalMode.UPDATE:
        this.store.dispatch(languageActions.update({ payload: this.form.value }));
        break;
    }
  }

  calculateMaxWidth(desktopMaxWidth: string): string {
    return Utils.calculateMaxWidth(desktopMaxWidth);
  }
}
