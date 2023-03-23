import { DatePipe } from '@angular/common';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Rol } from '@app/features/components/backoffice/tablas/roles/models/rol.model';
import { Usuario } from '@app/features/components/backoffice/tablas/usuarios/models/usuario.model';
import { ModalParams } from '@app/shared/models/modal-config/modal-mode';
import { ToastMessage } from '@app/shared/models/toast-message';
import { MessageHandlerType, ToastUtils } from '@app/shared/utils/ToastUtils';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { MessageService, PrimeNGConfig } from 'primeng/api';
import { Calendar } from 'primeng/calendar';
import { Observable, Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { rolActions } from '../../roles/state/rol.actions';
import { rolReducer } from '../../roles/state/rol.reducer';
import { RolState } from '../../roles/state/rol.state';
import { usuarioActions } from '../state/usuario.actions';
import { usuarioReducer } from '../state/usuario.reducer';
import { UsuarioState } from '../state/usuario.state';

@Component({
  selector: 'app-usuario-modal',
  templateUrl: './usuario-modal.component.html',
  styleUrls: ['./usuario-modal.component.scss'],
})
export class UsuarioModalComponent implements OnInit, OnDestroy {
  visible = false;

  @ViewChild(Calendar) calendar: Calendar;

  loading$: Observable<boolean> = this.usuarioStore.select(usuarioReducer.getLoading);

  usuario$: Observable<Usuario> = this.usuarioStore.select(usuarioReducer.getOne);

  message$: Observable<ToastMessage> = this.usuarioStore
    .select(usuarioReducer.getMessage)
    .pipe(filter(i => !!i));

  errores: string[] = [];

  form: FormGroup;

  es: any;

  filteredRoles: Rol[];

  roles: Rol[];

  creationMode: boolean;

  prepared = false;

  submitB = false;

  subscriptions: Subscription[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private rolStore: Store<RolState>,
    private usuarioStore: Store<UsuarioState>,
    private datePipe: DatePipe,
    private toastSrv: MessageService,
    private translateSrv: TranslateService,
    private config: PrimeNGConfig,
    private route: ActivatedRoute,
    private toastUtils: ToastUtils,
  ) {
    translateSrv.setDefaultLang('es');
    this.route.params.subscribe((params: ModalParams) => {
      if (params.modalMode) {
        switch (params.modalMode) {
          case 'VIEW':
            // this.show(ModalMode.VIEW);
            break;
          case 'UPDATE':
            // this.show(ModalMode.UPDATE);
            break;
          case 'CREATE':
            // this.show(ModalMode.CREATE);
            break;
          default:
            // this.show(ModalMode.VIEW);
            break;
        }
        if (params.modalMode !== 'CREATE') {
          this.usuarioStore.dispatch(usuarioActions.loadOne({ id: Number(params.id) }));
        }
      }
    });
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  ngOnInit(): void {
    this.translate('es');

    this.rolStore.select(rolReducer.getAll).subscribe(roles => {
      this.roles = roles;
      this.filteredRoles = this.roles;
    });

    this.rolStore.dispatch(rolActions.loadAllEntities());
    this.form = this.formBuilder.group({
      id: [''],
      username: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      correo: [
        '',
        [
          Validators.required,
          Validators.pattern('^([a-zA-Z0-9_\\-\\.]+)@([a-zA-Z0-9_\\-\\.]+)\\.([a-zA-Z]{2,5})$'),
        ],
      ],
      nombre: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      apellidos: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      activo: ['', Validators.required],
      password: ['', Validators.required],
      repeat_password: ['', Validators.required],
      fecAltaShow: [{ value: '', disabled: true }],
      fecAlta: [''],
      fecBaja: [''],
      rol: ['', Validators.required],
    });

    this.usuario$.subscribe(usuario => {
      this.patchValue(usuario);
    });

    this.rolStore.select(rolReducer.getOne).subscribe(rol => {
      if (this.prepared && rol) {
        const activo = !(
          this.f['fecBaja'].value &&
          new Date(this.f['fecBaja'].value).getTime() <= new Date().getTime()
        );
        const fecBaja = this.f['fecBaja'].value ? this.f['fecBaja'].value.getTime() : null;

        const result: Usuario = {
          id: this.f['id'].value,
          username: this.f['username'].value,
          correo: this.f['correo'].value,
          nombre: this.f['nombre'].value,
          apellidos: this.f['apellidos'].value,
          fecAlta: this.f['fecAlta'].value,
          fecBaja,
          activo,
          rol,
        };
        if (this.creationMode) {
          const password: string = this.f['password'].value;
          if (password === this.f['repeat_password'].value) {
            result.password = password;
            this.usuarioStore.dispatch(usuarioActions.create({ payload: result }));
          } else {
            console.error(this.translateSrv.instant('user.modal.passwordComp'));
          }
        } else {
          this.usuarioStore.dispatch(usuarioActions.update({ payload: result }));
        }
        this.prepared = false;
        this.rolStore.dispatch(rolActions.unload());
      }
    });

    const messageSubscription = this.message$.subscribe(async (message: ToastMessage) => {
      const res = await this.toastUtils.messageHandler(
        'user',
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
    this.translateSrv.get('calendar').subscribe(res => this.config.setTranslation(res));
  }

  ngAfterViewInit(): void {
    this.form?.controls['password'].valueChanges.subscribe(e => {
      this.comparePassword();
    });
    this.form?.controls['repeat_password'].valueChanges.subscribe(e => {
      this.comparePassword();
    });
  }

  send() {
    this.submitB = true;
    Object.values(this.form?.controls).forEach(control => {
      control.markAsDirty();
    });
    if (this.form.invalid) {
      // this.toastSrv.add({ severity: 'warn', summary: 'Error', detail: this.translateSrv.instant('user.modal.invalid') });
      // let errorCampo = this.translateSrv.instant('user.modal.error');
      // for (let name in this.form?.controls) {
      //   let control = this.form?.controls[name];
      //   let nameTrad = this.translateSrv.instant('columns.' + name)

      //   if (control.invalid && control.value == '' || control.invalid && control.value == null) {
      //     this.errores[name] = errorCampo + nameTrad
      //   }
      // }
      return;
    }

    this.prepared = true;
    this.rolStore.dispatch(rolActions.unload());
    this.rolStore.dispatch(rolActions.loadOne({ id: this.f['rol'].value.id }));
  }

  filterRoles(event) {
    this.filteredRoles = [];
    for (let i = 0; i < this.roles.length; i += 1) {
      const rol = this.roles[i];
      if (rol.codigo.toLowerCase().indexOf(event.query.toLowerCase()) === 0) {
        this.filteredRoles.push(rol);
      }
    }
  }

  show(creationMode: boolean) {
    this.patchValue(null);
    this.creationMode = creationMode;
    if (creationMode) {
      this.usuarioStore.dispatch(usuarioActions.unload());
      this.f['password'].enable();
      this.f['repeat_password'].enable();
    } else {
      this.f['password'].disable();
      this.f['repeat_password'].disable();
    }

    this.visible = true;
  }

  onHide() {
    this.visible = false;
    this.errores = [];
    this.usuarioStore.dispatch(usuarioActions.unload());
    this.form.reset();
    this.submitB = false;
  }

  onInputFecBaja(fecha: string) {
    try {
      this.onChangeFecBaja(<Date>this.calendar.parseValueFromString(fecha));
      // eslint-disable-next-line no-empty
    } catch (error) {}
  }

  onChangeFecBaja(fecha: Date) {
    this.f['activo'].setValue(fecha == null || fecha.getTime() > new Date().getTime());
  }

  comparePassword() {
    // if (this.form?.controls['password'].value && this.form?.controls['repeat_password'].value) {
    //   if (this.form?.controls['password'].value != this.form?.controls['repeat_password'].value) {
    //     this.errores.passwordComp = this.translateSrv.instant('general.passwordComp');
    //   } else {
    //     this.errores.passwordComp = '';
    //   }
    // } else {
    //   this.errores.passwordComp = '';
    // }
  }

  patchValue(usuario: Usuario) {
    if (!this.form) {
      return;
    }
    if (usuario) {
      const fecBaja = usuario.fecBaja ? new Date(usuario.fecBaja) : null;
      this.form.patchValue({
        id: usuario.id,
        username: usuario.username,
        correo: usuario.correo,
        nombre: usuario.nombre,
        apellidos: usuario.apellidos,
        activo: usuario.activo,
        fecAlta: usuario.fecAlta,
        fecAltaShow: usuario.fecAlta
          ? this.datePipe.transform(new Date(usuario.fecAlta), 'dd-MM-yyy')
          : null,
        fecBaja,
        rol: usuario.rol,
      });
    } else {
      this.form.patchValue({
        id: null,
        username: '',
        correo: '',
        nombre: '',
        apellidos: '',
        pasword: '',
        repeat_password: '',
        activo: false,
        fecAlta: new Date(),
        fecBaja: null,
        rol: null,
      });
    }
  }

  get f() {
    return this.form?.controls;
  }
}
