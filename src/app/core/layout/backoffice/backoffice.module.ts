import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormularioRecuperacionComponent } from '@app/features/components/backoffice/autentificacion/formulario-recuperacion/formulario-recuperacion.component';
import { LoginComponent } from '@app/features/components/backoffice/autentificacion/login/login.component';
import { RecuperarPasswordComponent } from '@app/features/components/backoffice/autentificacion/recuperar-password/recuperar-password.component';
import { MenuSidebarStateModule } from '@app/features/components/backoffice/tablas/menus/state/sidebar/menu-sidebar-state.module';
import { LanguageSelectModule } from '@app/shared/components/language-select/language-select.module';
import { BasicModule } from '@app/shared/modules/basic.module';
import { LanguagesModule } from '@app/shared/modules/languages.module';
import { PrimeNgModule } from '@app/shared/modules/primeng.module';
import { BackofficeRoutingModule } from './backoffice-routing.module';
import { HeaderComponent } from './header/header.component';
import { MainComponent } from './main/main.component';
import { HomeMenuComponent } from './sidebar/menu/home.menu.component';
import { MenuitemComponent } from './sidebar/menu/menuitem.component';
import { SettingsMenuComponent } from './sidebar/menu/settings.menu.component';
import { SideBarComponent } from './sidebar/sidebar.component';
import { SidebartabcontentComponent } from './sidebar/sidebartabcontent.component';

@NgModule({
  declarations: [
    LoginComponent,
    HeaderComponent,
    SideBarComponent,
    MainComponent,
    SettingsMenuComponent,
    HomeMenuComponent,
    MenuitemComponent,
    SidebartabcontentComponent,
    RecuperarPasswordComponent,
    FormularioRecuperacionComponent,
  ],
  imports: [
    LanguageSelectModule,
    LanguagesModule,
    CommonModule,
    BasicModule,
    PrimeNgModule,
    BackofficeRoutingModule,

    MenuSidebarStateModule,
  ],
  providers: [],
  exports: [RouterModule],
})
export class BackofficeModule {}
