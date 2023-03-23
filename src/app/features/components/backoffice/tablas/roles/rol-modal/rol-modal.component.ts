import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Permiso } from '@app/features/components/backoffice/tablas/permisos/models/permiso.model';
import { Rol } from '@app/features/components/backoffice/tablas/roles/models/rol.model';
import { ModalMode, ModalParams } from '@app/shared/models/modal-config/modal-mode';
import { ToastMessage } from '@app/shared/models/toast-message';
import { MessageHandlerType, ToastUtils } from '@app/shared/utils/ToastUtils';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { MessageService } from 'primeng/api';
import { Observable, Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { permisoActions } from '../../permisos/state/permiso.actions';
import { permisoReducer } from '../../permisos/state/permiso.reducer';
import { rolActions } from '../state/rol.actions';
import { rolReducer } from '../state/rol.reducer';
import { RolState } from '../state/rol.state';

@Component({
  selector: 'app-rol-modal',
  templateUrl: './rol-modal.component.html',
  styleUrls: ['./rol-modal.component.scss'],
})
export class RolModalComponent implements OnInit, OnDestroy {
  visible = false;

  loading$: Observable<boolean> = this.store.select(rolReducer.getLoading);

  rol$: Observable<Rol> = this.store.select(rolReducer.getOne);

  message$: Observable<ToastMessage> = this.store
    .select(rolReducer.getMessage)
    .pipe(filter(i => !!i));

  errores: string[] = [];

  form: FormGroup;

  es: any;

  modalMode: ModalMode;

  subscriptions: Subscription[] = [];

  permisos: Permiso[] = [];

  constructor(
    private store: Store<RolState>,
    private toastSrv: MessageService,
    private formBuilder: FormBuilder,
    private translateSrv: TranslateService,
    private route: ActivatedRoute,
    private router: Router,
    private toastUtils: ToastUtils,
  ) {
    translateSrv.setDefaultLang('es');
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
          this.store.dispatch(rolActions.loadOne({ id: Number(params.id) }));
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
      id: [''],
      codigo: ['', [Validators.required]],
      descripcion: [''],
      permisos: [[], [Validators.required]],
    });

    this.store.dispatch(permisoActions.loadAllEntities());
    const permisosSubscription: Subscription = this.store
      .select(permisoReducer.getAll)
      .subscribe(permisos => {
        this.permisos = permisos;
      });
    this.subscriptions.push(permisosSubscription);

    const rolSubscription: Subscription = this.rol$.subscribe(rol => {
      this.patchValue(rol);
    });
    this.subscriptions.push(rolSubscription);

    const messageSubscription = this.message$.subscribe(async (message: ToastMessage) => {
      const res = await this.toastUtils.messageHandler(
        'rol',
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
      this.store.dispatch(rolActions.unload());
    }

    this.visible = true;
  }

  onHide() {
    this.visible = false;
    this.errores = [];
    this.store.dispatch(rolActions.unload());
    this.form.reset();
    this.router.navigate(['backoffice', 'roles']);
  }

  patchValue(rol: Rol) {
    if (!this.form) {
      return;
    }
    if (rol) {
      this.form.patchValue({
        id: rol.id,
        codigo: rol.codigo,
        descripcion: rol.descripcion,
        permisos: rol.permisos,
      });
    } else {
      this.form.patchValue({
        id: null,
        codigo: '',
        descripcion: '',
        permisos: [],
      });
    }
  }

  send() {
    Object.values(this.form?.controls).forEach(control => {
      control.markAsDirty();
    });
    if (this.form.invalid) {
      // this.toastSrv.add({ severity: 'warn', summary: 'Error', detail: this.translateSrv.instant('user.modal.invalid') });
      // let errorCampo = this.translateSrv.instant('rol.modal.error');
      // for (let name in this.form?.controls) {
      //   let control = this.form?.controls[name];
      //   let nameTrad = this.translateSrv.instant('columns.' + name)

      //   if (control.invalid && control.value == '' || control.invalid && control.value == null) {
      //     this.errores[name] = errorCampo + nameTrad
      //   }
      // }
      return;
    }

    switch (this.modalMode) {
      case ModalMode.CREATE:
        this.store.dispatch(rolActions.create({ payload: this.form.value }));
        break;
      case ModalMode.UPDATE:
        this.store.dispatch(rolActions.update({ payload: this.form.value }));
        break;
    }
  }
}
