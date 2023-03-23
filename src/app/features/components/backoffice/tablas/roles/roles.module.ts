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
import { PermisoStateModule } from '../permisos/state/permiso-state.module';
import { RolModalComponent } from './rol-modal/rol-modal.component';
import { RolComponent } from './rol/rol.component';
import { RolesRoutingModule } from './roles-routing.module';
import { RolStateModule } from './state/rol-state.module';

@NgModule({
  declarations: [RolComponent, RolModalComponent],
  imports: [
    BasicModule,
    RolesRoutingModule,
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

    RolStateModule,
    PermisoStateModule,
    PipesModule,

    LanguagesModule,
  ],
})
export class RolesModule {}
