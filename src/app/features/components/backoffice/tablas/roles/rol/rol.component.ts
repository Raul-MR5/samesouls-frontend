import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Permiso } from '@app/features/components/backoffice/tablas/permisos/models/permiso.model';
import { Rol } from '@app/features/components/backoffice/tablas/roles/models/rol.model';
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
import { RolModalComponent } from '../rol-modal/rol-modal.component';
import { rolActions } from '../state/rol.actions';
import { rolReducer } from '../state/rol.reducer';
import { RolState } from '../state/rol.state';

@Component({
  selector: 'app-rol',
  templateUrl: './rol.component.html',
  styleUrls: ['./rol.component.scss'],
})
export class RolComponent implements OnInit {
  @ViewChild(RolModalComponent) modal: RolModalComponent;

  entities$: Observable<Rol[]> = this.store.select(rolReducer.getAll);

  loading$: Observable<boolean> = this.store.select(rolReducer.getLoading);

  count$: Observable<number> = this.store.select(rolReducer.getCount);

  requestFilter: RequestFilter = environment.defaultRequestFilter;

  tableConfig: TableConfig;

  permisos: Permiso[] = [];

  loadTable = false;

  constructor(
    private store: Store<RolState>,
    private toastSrv: MessageService,
    private router: Router,
    private translateSrv: TranslateService,
    private accountStore: Store<fromAccount.AppState>,
    private publicLanguageStore: Store<PublicLanguageState>,
    private confirmationSrv: ConfirmationService,
    private messageSrv: MessageService,
  ) {}

  ngOnInit(): void {
    this.publicLanguageStore
      .select(publicLanguageReducer.getOne)
      .pipe(filter((i) => i != null))
      .subscribe((language) => {
        this.translateSrv.use(language.siglas);
      });
    this.translateSrv.onLangChange.subscribe((event: LangChangeEvent) => {
      this.cargarPagina();
    });

    this.getAll();
    this.cargarPagina();
  }

  getAll() {
    this.accountStore.dispatch(accountActions.loadPermisos());
    this.accountStore
      .select(fromAccount.getPermisos)
      .pipe(filter((permisos) => permisos !== null))
      .subscribe((permisos) => {
        this.permisos = permisos;
        this.loadTable = true;
        this.cargarPagina();
      });
    this.store.dispatch(rolActions.loadAll({ payload: this.requestFilter }));
  }

  onWarnClose() {
    this.toastSrv.clear('forbidden');
    this.router.navigate(['/']);
  }

  onClick(event) {
    switch (event.type) {
      case 'add': {
        this.router.navigate(['backoffice', 'roles', { modalMode: 'CREATE' }]);
        break;
      }
      case 'edit': {
        this.router.navigate([
          'backoffice',
          'roles',
          { modalMode: 'UPDATE', id: event.data.id },
        ]);
        break;
      }
      case 'delete': {
        this.confirmationSrv.confirm({
          message: this.translateSrv.instant('messages.confirmation.message', {
            name: this.translateSrv.instant('tables.rol.singular'),
          }),
          header: this.translateSrv.instant('messages.confirmation.header'),
          icon: 'pi pi-info-circle',
          rejectLabel: this.translateSrv.instant('buttons.reject'),
          acceptLabel: this.translateSrv.instant('buttons.accept'),
          accept: () => {
            this.store.dispatch(rolActions.delete({ id: event.data.id }));
          },
        });
        break;
      }
    }
  }

  cargarPagina() {
    const optionButtons = [];
    const topButtons = [];
    const entityName = 'USUARIO';

    const createPermission = this.permisos.find(
      (permiso) => permiso.codigo === `CREATE_${entityName}`,
    );
    const updatePermission = this.permisos.find(
      (permiso) => permiso.codigo === `UPDATE_${entityName}`,
    );
    const deletePermission = this.permisos.find(
      (permiso) => permiso.codigo === `DELETE_${entityName}`,
    );

    createPermission !== undefined
      ? topButtons.push({
        action: 'add',
        icon: 'pi pi-plus',
        label: this.translateSrv.instant('buttons.new', {
          name: this.translateSrv.instant('tables.edificio.singular'),
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
          field: 'codigo',
          nombre: this.translateSrv.instant('columns.codigo'),
          sort: true,
          filter: true,
        },
        {
          field: 'descripcion',
          nombre: this.translateSrv.instant('columns.descripcion'),
          sort: true,
          filter: true,
        },
      ],
      optionButtons,
      topButtons,
    };
  }
}
