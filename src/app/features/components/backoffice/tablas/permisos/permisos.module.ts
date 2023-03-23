import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TablaGenericaModule } from '@app/shared/components/tabla-generica/tabla-generica.module';
import { BasicModule } from '@app/shared/modules/basic.module';
import { LanguagesModule } from '@app/shared/modules/languages.module';
import { PipesModule } from '@app/shared/modules/pipes.module';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { MultiSelectModule } from 'primeng/multiselect';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { PermisoModalComponent } from './permiso-modal/permiso-modal.component';
import { PermisoComponent } from './permiso/permiso.component';
import { PermisosRoutingModule } from './permisos-routing.module';
import { PermisoStateModule } from './state/permiso-state.module';

@NgModule({
  declarations: [PermisoComponent, PermisoModalComponent],
  imports: [
    BasicModule,
    PermisosRoutingModule,
    TablaGenericaModule,
    FormsModule,

    ReactiveFormsModule,
    ButtonModule,
    ConfirmDialogModule,
    TableModule,
    DialogModule,
    ToastModule,
    InputTextareaModule,
    CommonModule,
    MultiSelectModule,
    InputTextModule,

    PermisoStateModule,
    PermisoStateModule,
    PipesModule,

    LanguagesModule,
  ],
})
export class PermisosModule {}
