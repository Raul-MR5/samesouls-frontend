import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Menu } from '@app/features/components/backoffice/tablas/menus/models/menu.model';
import { ModalMode, ModalParams } from '@app/shared/models/modal-config/modal-mode';
import { ToastMessage } from '@app/shared/models/toast-message';
import { MessageHandlerType, ToastUtils } from '@app/shared/utils/ToastUtils';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { MessageService } from 'primeng/api';
import { Observable, Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { menuActions } from '../state/menu.actions';
import { menuReducer } from '../state/menu.reducer';
import { MenuState } from '../state/menu.state';

@Component({
  selector: 'app-menu-modal',
  templateUrl: './menu-modal.component.html',
  styleUrls: ['./menu-modal.component.scss'],
})
export class MenuModalComponent implements OnInit, OnDestroy {
  visible = false;

  loading$: Observable<boolean> = this.store.select(menuReducer.getLoading);

  menus: Menu[] = [];

  menus$: Observable<Menu[]> = this.store.select(menuReducer.getAll);

  menu$: Observable<Menu> = this.store.select(menuReducer.getOne);

  message$: Observable<ToastMessage> = this.store
    .select(menuReducer.getMessage)
    .pipe(filter(i => !!i));

  errores: string[] = [];

  form: FormGroup;

  es: any;

  modalMode: ModalMode;

  subscriptions: Subscription[] = [];

  constructor(
    private store: Store<MenuState>,
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
          this.store.dispatch(menuActions.loadOne({ id: Number(params.id) }));
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
      id: [undefined],
      nombre: [undefined, [Validators.required]],
      orden: [undefined, [Validators.required]],
      ruta: [undefined, []],
      icono: [undefined, [Validators.required]],
      menu: [undefined, []],
    });
    this.store.dispatch(menuActions.loadAllEntities());
    this.menus$.subscribe(menus => {
      this.menus = menus.map(menu => ({
        nombre: menu.nombre,
        icono: menu.icono,
        id: menu.id,
        ruta: menu.ruta,
        orden: menu.orden,
      }));
    });

    const menuSubscription: Subscription = this.menu$.subscribe(menu => {
      this.patchValue(menu);
    });
    this.subscriptions.push(menuSubscription);

    const messageSubscription = this.message$.subscribe(async (message: ToastMessage) => {
      const res = await this.toastUtils.messageHandler(
        'menu',
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
    this.modalMode = modalMode;
    if (modalMode === ModalMode.CREATE) {
      this.store.dispatch(menuActions.unload());
    }

    this.visible = true;
  }

  onHide() {
    this.visible = false;
    this.errores = [];
    this.store.dispatch(menuActions.unload());
    this.form.reset();
    this.router.navigate(['backoffice', 'menus']);
  }

  patchValue(menu: Menu) {
    if (!this.form) {
      return;
    }
    if (menu) {
      this.form.patchValue({
        id: menu.id,
        nombre: menu.nombre,
        orden: menu.orden,
        ruta: menu.ruta,
        icono: menu.icono,
        menu: menu.menu,
      });
    } else {
      this.form.patchValue({
        id: null,
        nombre: '',
        orden: 0,
        ruta: '',
        icono: '',
        menu: null,
      });
    }
  }

  send() {
    Object.values(this.form?.controls).forEach(control => {
      control.markAsDirty();
    });
    if (this.form.invalid) {
      // this.toastSrv.add({ severity: 'warn', summary: 'Error', detail: this.translateSrv.instant('user.modal.invalid') });
      // let errorCampo = this.translateSrv.instant('menu.modal.error');
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
        this.store.dispatch(menuActions.create({ payload: this.form.value }));
        break;
      case ModalMode.UPDATE:
        this.store.dispatch(menuActions.update({ payload: this.form.value }));
        break;
    }
  }
}
