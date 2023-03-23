/* eslint-disable @typescript-eslint/no-unused-expressions */
import { Component, OnInit, ViewChild } from '@angular/core';
import { Permiso } from '@app/features/components/backoffice/tablas/permisos/models/permiso.model';
import { Usuario } from '@app/features/components/backoffice/tablas/usuarios/models/usuario.model';
import { RequestFilter } from '@app/shared/models/request-filter';
import { TableConfig } from '@app/shared/models/table-config/table-config';
import { Action as accountActions } from '@app/shared/state/account/account.actions';
import * as fromAccount from '@app/shared/state/account/account.reducer';
import { publicLanguageReducer } from '@app/shared/state/languages/public-language.reducer';
import { PublicLanguageState } from '@app/shared/state/languages/public-language.state';
import { environment } from '@env/environment';
import { Store } from '@ngrx/store';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { usuarioActions } from '../state/usuario.actions';
import { usuarioReducer } from '../state/usuario.reducer';
import { UsuarioState } from '../state/usuario.state';
import { UsuarioModalComponent } from '../usuario-modal/usuario-modal.component';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.scss'],
  providers: [],
})
export class UsuarioComponent implements OnInit {
  @ViewChild(UsuarioModalComponent) modal: UsuarioModalComponent;

  entities$: Observable<Usuario[]> = this.store.select(usuarioReducer.getAll);

  loading$: Observable<boolean> = this.store.select(usuarioReducer.getLoading);

  count$: Observable<number> = this.store.select(usuarioReducer.getCount);

  requestFilter: RequestFilter = environment.defaultRequestFilter;

  tableConfig: TableConfig;

  permisos: Permiso[] = [];

  loadTable = false;

  constructor(
    private store: Store<UsuarioState>,
    private accountStore: Store<fromAccount.AppState>,
    private confirmationSrv: ConfirmationService,
    private messageSrv: MessageService,
    private translateSrv: TranslateService,
    private publicLanguageStore: Store<PublicLanguageState>,
  ) {}

  ngOnInit(): void {
    this.publicLanguageStore
      .select(publicLanguageReducer.getOne)
      .pipe(filter(i => i != null))
      .subscribe(idioma => {
        this.translateSrv.use(idioma.siglas);
      });
    this.translateSrv.onLangChange.subscribe((event: LangChangeEvent) => {
      this.cargarPagina();
    });

    this.cargarPagina();
    this.getAll();
  }

  getAll() {
    this.accountStore.dispatch(accountActions.loadPermisos());
    this.accountStore
      .select(fromAccount.getPermisos)
      .pipe(filter(permisos => permisos !== null))
      .subscribe(permisos => {
        this.permisos = permisos;
        this.cargarPagina();
        this.loadTable = true;
      });
    this.store.dispatch(usuarioActions.loadAll({ payload: this.requestFilter }));
  }

  onClick(event) {
    switch (event.type) {
      case 'add': {
        this.modal.show(true);
        break;
      }
      case 'edit': {
        this.modal.show(false);
        this.store.dispatch(usuarioActions.loadOne({ id: event.data.id }));
        // this.router.navigate([`${event.data.id}`], {relativeTo: this.activatedRoute});
        break;
      }
      case 'delete': {
        this.confirmationSrv.confirm({
          message: this.translateSrv.instant('messages.confirmation.message', {
            name: this.translateSrv.instant('tables.tipologia.singular'),
          }),
          header: this.translateSrv.instant('messages.confirmation.header'),
          icon: 'pi pi-info-circle',
          rejectLabel: this.translateSrv.instant('buttons.reject'),
          acceptLabel: this.translateSrv.instant('buttons.accept'),
          accept: () => {
            this.store.dispatch(usuarioActions.delete({ id: event.data.id }));
          },
        });

        break;
      }
    }
  }

  onRowEditInit(usuario: Usuario) {
    this.store.dispatch(usuarioActions.loadOne({ id: usuario.id }));
  }

  cargarPagina() {
    const optionButtons = [];
    const topButtons = [];
    const entityName = 'USUARIO';

    const createPermission = this.permisos.find(
      permiso => permiso.codigo === `CREATE_${entityName}`,
    );
    const updatePermission = this.permisos.find(
      permiso => permiso.codigo === `UPDATE_${entityName}`,
    );
    const deletePermission = this.permisos.find(
      permiso => permiso.codigo === `DELETE_${entityName}`,
    );

    createPermission !== undefined
      ? topButtons.push({
          action: 'add',
          icon: 'pi pi-plus',
          label: this.translateSrv.instant('buttons.new', {
            name: this.translateSrv.instant('tables.user.singular'),
          }),
        })
      : null;

    updatePermission !== undefined
      ? optionButtons.push({ action: 'edit', icon: 'pi pi-pencil' })
      : null;
    deletePermission !== undefined
      ? optionButtons.push({ action: 'delete', icon: 'pi pi-trash' })
      : null;

    this.tableConfig = {
      fieldConfig: [
        {
          field: 'username',
          nombre: this.translateSrv.instant('columns.username'),
          sort: true,
          filter: true,
        },
        {
          field: 'nombre',
          nombre: this.translateSrv.instant('columns.nombre'),
          sort: true,
          filter: true,
        },
        {
          field: 'apellidos',
          nombre: this.translateSrv.instant('columns.apellidos'),
          sort: true,
          filter: true,
        },
        {
          field: 'correo',
          nombre: this.translateSrv.instant('columns.correo'),
          sort: true,
          filter: true,
        },
        {
          field: 'fecAlta',
          nombre: this.translateSrv.instant('columns.fecAlta'),
          sort: true,
          filter: false,
          tipo: 'FECHA',
        },
        {
          field: 'fecBaja',
          nombre: this.translateSrv.instant('columns.fecBaja'),
          sort: true,
          filter: false,
          tipo: 'FECHA_HORA',
        },
        {
          field: 'activo',
          nombre: this.translateSrv.instant('columns.activo'),
          sort: false,
          filter: false,
          tipo: 'ACTIVO',
        },
      ],
      optionButtons,
      topButtons,
    };
  }
}
