import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormularioRecuperacionComponent } from '@app/features/components/backoffice/autentificacion/formulario-recuperacion/formulario-recuperacion.component';
import { LoginComponent } from '@app/features/components/backoffice/autentificacion/login/login.component';
import { RecuperarPasswordComponent } from '@app/features/components/backoffice/autentificacion/recuperar-password/recuperar-password.component';
import { BasicModule } from '@app/shared/modules/basic.module';
import { AuthGuard } from '../../../shared/guards/auth.guard';
import { MainComponent } from './main/main.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('@app/features/components/backoffice/home/home.module').then(m => m.HomeModule),
        canActivate: [AuthGuard],
        pathMatch: 'full',
      },
      {
        path: 'usuarios',
        loadChildren: () =>
          import('@app/features/components/backoffice/tablas/usuarios/usuarios.module').then(
            m => m.UsuariosModule,
          ),
        canActivate: [AuthGuard],
      },
      {
        path: 'roles',
        loadChildren: () =>
          import('@app/features/components/backoffice/tablas/roles/roles.module').then(
            m => m.RolesModule,
          ),
        canActivate: [AuthGuard],
      },
      {
        path: 'log',
        loadChildren: () =>
          import('@app/features/components/backoffice/log/log.module').then(m => m.LogModule),
        canActivate: [AuthGuard],
      },
      {
        path: 'menus',
        loadChildren: () =>
          import('@app/features/components/backoffice/tablas/menus/menus.module').then(
            m => m.MenusModule,
          ),
        canActivate: [AuthGuard],
      },
      {
        path: 'permisos',
        loadChildren: () =>
          import('@app/features/components/backoffice/tablas/permisos/permisos.module').then(
            m => m.PermisosModule,
          ),
        canActivate: [AuthGuard],
      },
      {
        path: 'configuracion',
        loadChildren: () =>
          import('@app/features/components/backoffice/conf/conf.module').then(m => m.ConfModule),
        canActivate: [AuthGuard],
      },
      {
        path: 'languages',
        loadChildren: () =>
          import('@app/features/components/backoffice/tablas/languages/languages.module').then(
            m => m.LanguagesModule,
          ),
        canActivate: [AuthGuard],
      },
      {
        path: 'swagger',
        loadChildren: () =>
          import('@app/features/components/backoffice/swagger/swagger.module').then(
            m => m.SwaggerModule,
          ),
        canActivate: [AuthGuard],
      },
    ],
  },
  { path: 'login', component: LoginComponent },
  { path: 'recuperar-password', component: RecuperarPasswordComponent },
  {
    path: 'recuperar-password/:token',
    component: FormularioRecuperacionComponent,
  },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
];

@NgModule({
  declarations: [],
  imports: [BasicModule, RouterModule.forChild(routes)],
  providers: [],
  exports: [RouterModule],
})
export class BackofficeRoutingModule {}
