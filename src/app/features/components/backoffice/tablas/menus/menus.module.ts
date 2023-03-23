import { NgModule } from '@angular/core';
import { BaseFormModule } from '@app/shared/components/base-form/base-form.module';
import { TablaGenericaModule } from '@app/shared/components/tabla-generica/tabla-generica.module';
import { BasicModule } from '@app/shared/modules/basic.module';
import { LanguagesModule } from '@app/shared/modules/languages.module';
import { PipesModule } from '@app/shared/modules/pipes.module';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { CardModule } from 'primeng/card';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputSwitchModule } from 'primeng/inputswitch';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { MenuModalComponent } from './menu-modal/menu-modal.component';
import { MenuComponent } from './menu/menu.component';
import { MenusRoutingModule } from './menus-routing.module';
import { MenuStateModule } from './state/menu-state.module';
import { MenuSidebarStateModule } from './state/sidebar/menu-sidebar-state.module';

@NgModule({
  declarations: [MenuComponent, MenuModalComponent],
  imports: [
    BasicModule,
    MenusRoutingModule,

    ToastModule,
    ButtonModule,
    MessageModule,
    DialogModule,
    TableModule,
    CardModule,
    ConfirmDialogModule,
    AutoCompleteModule,
    ButtonModule,
    CalendarModule,
    DialogModule,
    DropdownModule,
    InputTextModule,
    InputSwitchModule,
    InputNumberModule,

    TablaGenericaModule,
    BaseFormModule,
    LanguagesModule,
    PipesModule,

    MenuSidebarStateModule,
    MenuStateModule,
  ],
})
export class MenusModule {}
