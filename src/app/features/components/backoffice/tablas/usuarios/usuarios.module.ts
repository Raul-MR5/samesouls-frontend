import { CommonModule, DatePipe } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TablaGenericaModule } from '@app/shared/components/tabla-generica/tabla-generica.module';
import { BasicModule } from '@app/shared/modules/basic.module';
import { LanguagesModule } from '@app/shared/modules/languages.module';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { CardModule } from 'primeng/card';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { InputSwitchModule } from 'primeng/inputswitch';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';
import { PaginatorModule } from 'primeng/paginator';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { BaseFormModule } from '../../../../../shared/components/base-form/base-form.module';
import { RolStateModule } from '../roles/state/rol-state.module';
import { UsuarioStateModule } from './state/usuario-state.module';
import { UsuarioFormComponent } from './usuario-form/usuario-form.component';
import { UsuarioModalComponent } from './usuario-modal/usuario-modal.component';
import { UsuarioComponent } from './usuario/usuario.component';
import { UsuariosRoutingModule } from './usuarios-routing.module';

@NgModule({
  declarations: [UsuarioComponent, UsuarioModalComponent, UsuarioFormComponent],
  imports: [
    BaseFormModule,
    BasicModule,
    UsuariosRoutingModule,

    TablaGenericaModule,

    AutoCompleteModule,
    ButtonModule,
    CalendarModule,
    DialogModule,
    DropdownModule,
    InputTextModule,
    InputSwitchModule,
    PaginatorModule,
    ProgressSpinnerModule,
    TableModule,
    ToastModule,
    CardModule,
    MessageModule,
    ConfirmDialogModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    LanguagesModule,

    CommonModule,
    UsuarioStateModule,
    RolStateModule,
  ],
  providers: [DatePipe],
})
export class UsuariosModule {}
