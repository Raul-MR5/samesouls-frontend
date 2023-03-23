import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from '@app/features/components/backoffice/tablas/usuarios/models/usuario.model';
import { FieldType } from '@app/shared/components/base-form/base-form-container/base-form-container.component';
import { BaseFormConfig } from '@app/shared/models/form-config/base-form-config';
import { BaseFormFieldConfig } from '@app/shared/models/form-config/base-form-field-config';
import { TableConfig } from '@app/shared/models/table-config/table-config';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { rolActions } from '../../roles/state/rol.actions';
import { rolReducer } from '../../roles/state/rol.reducer';
import { RolState } from '../../roles/state/rol.state';
import { usuarioActions } from '../state/usuario.actions';
import { usuarioReducer } from '../state/usuario.reducer';
import { UsuarioState } from '../state/usuario.state';

@Component({
  selector: 'app-usuario-form',
  templateUrl: './usuario-form.component.html',
  styleUrls: ['./usuario-form.component.scss'],
})
export class UsuarioFormComponent implements OnInit, OnDestroy {
  usuario: Usuario;

  formConfig: BaseFormConfig;

  form: FormGroup = this.formBuilder.group({});

  rolFieldConfig: BaseFormFieldConfig;

  rolTableConfig: BaseFormFieldConfig;

  errors: string[] = [];

  private subscriptions: Subscription[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private rolStore: Store<RolState>,
    private usuarioStore: Store<UsuarioState>,
  ) {}

  ngOnDestroy(): void {
    this.subscriptions.forEach((s) => s.unsubscribe());
  }

  ngOnInit(): void {
    this.rolFieldConfig = {
      name: 'Rol',
      formControlName: 'rol',
      type: FieldType.SELECT_CUSTOM,
      width: 'lg:col-4 md:col-6 sm:col-12',
      size: 'p-inputtext-sm',
      validators: [Validators.required],
      data: {
        dataKey: 'id',
        optionLabel: 'codigo',
        defaultLabel: 'Selecciona un rol',
        options: [],
        itemTemplate: '<div>{{value.codigo}} - TEST</div>',
      },
    };

    const tableConfig: TableConfig = {
      lazy: false,
      fieldConfig: [
        {
          field: 'codigo', nombre: 'Codigo', filter: true, sort: true,
        },
        {
          field: 'descripcion',
          nombre: 'Descripcion',
          filter: true,
          sort: true,
        },
      ],
    };

    this.rolTableConfig = {
      name: 'Rol',
      type: FieldType.TABLE,
      width: 'lg:col-12 md:col-12 sm:col-12',
      data: {
        config: tableConfig,
        values: [],
      },
    };

    this.formConfig = {
      containers: [
        {
          title: 'Datos personales',
          code: 'datosPersonales',
          width: 'lg:col-12 md:col-12 sm:col-12',
          content: [
            {
              name: 'Nombre de usuario',
              formControlName: 'username',
              type: FieldType.TEXT,
              width: 'lg:col-4 md:col-6 sm:col-12',
              size: 'p-inputtext-sm',
              validators: [
                Validators.required,
                Validators.minLength(3),
                Validators.maxLength(50),
              ],
            },
            {
              name: 'Nombre',
              formControlName: 'nombre',
              type: FieldType.TEXT,
              width: 'lg:col-4 md:col-6 sm:col-12',
              size: 'p-inputtext-sm',
              validators: [
                Validators.required,
                Validators.minLength(3),
                Validators.maxLength(50),
              ],
            },
            {
              name: 'Apellidos',
              formControlName: 'apellidos',
              type: FieldType.TEXT,
              width: 'lg:col-4 md:col-6 sm:col-12',
              size: 'p-inputtext-sm',
              validators: [Validators.minLength(3), Validators.maxLength(50)],
            },
            {
              name: 'Correo',
              formControlName: 'correo',
              type: FieldType.TEXT,
              width: 'lg:col-5 md:col-6 sm:col-12',
              size: 'p-inputtext-sm',
              validators: [Validators.required, Validators.email],
            },
          ],
        },
        {
          title: 'Control de usuario',
          code: 'controlUsuario',
          width: 'lg:col-12 md:col-12 sm:col-12',
          content: [
            {
              name: 'Fecha de baja',
              formControlName: 'fecBaja',
              type: FieldType.DATETIME,
              width: 'lg:col-4 md:col-6 sm:col-12',
              size: 'p-inputtext-sm',
            },
            {
              title: 'Rol',
              code: 'rolForm',
              content: [this.rolFieldConfig, this.rolTableConfig],
            },
            {
              title: 'Contraseña',
              code: 'contraseñaForm',
              content: [
                {
                  name: 'Contraseña',
                  formControlName: 'password',
                  type: FieldType.TEXT,
                  width: 'lg:col-4 md:col-6 sm:col-12',
                  size: 'p-inputtext-sm',
                  validators: [Validators.required],
                },
                {
                  name: 'Repetir Contraseña',
                  formControlName: 'repeatPassword',
                  type: FieldType.TEXT,
                  width: 'lg:col-4 md:col-6 sm:col-12',
                  size: 'p-inputtext-sm',
                  validators: [Validators.required],
                },
              ],
            },
          ],
        },
      ],
      buttons: [{ label: 'Guardar', action: 'save' }],
    };

    this.subscriptions.push(
      this.rolStore.select(rolReducer.getAll).subscribe((roles) => {
        if (roles) {
          this.rolFieldConfig.data.options = roles;
          this.rolTableConfig.data.values = roles;
        }
      }),
    );
    this.rolStore.dispatch(rolActions.loadAllEntities());

    this.subscriptions.push(
      this.usuarioStore.select(usuarioReducer.getOne).subscribe((usuario) => {
        this.usuario = usuario;
        this.pathValue();
      }),
    );

    this.activatedRoute.paramMap.subscribe((paramMap) => {
      const id: number = +paramMap.get('id');
      this.usuarioStore.dispatch(usuarioActions.loadOne({ id }));
    });
  }

  pathValue() {
    if (!this.form) {
      return;
    }
    if (this.usuario) {
      this.form.patchValue({
        id: this.usuario.id,
        nombre: this.usuario.nombre,
        apellidos: this.usuario.apellidos,
        username: this.usuario.username,
        correo: this.usuario.correo,
        fecBaja: this.usuario.fecBaja,
        fecAlta: this.usuario.fecAlta,
        rol: this.usuario.rol,
      });
    } else {
      this.form.patchValue({
        id: null,
        nombre: null,
        apellidos: null,
        username: null,
        correo: null,
        fecBaja: null,
        fecAlta: null,
        rol: null,
      });
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/no-unused-vars
  onButtonClick(event) {}
}
