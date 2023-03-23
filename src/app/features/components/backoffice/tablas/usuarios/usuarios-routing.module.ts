import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@app/shared/guards/auth.guard';
import { UsuarioFormComponent } from './usuario-form/usuario-form.component';
import { UsuarioComponent } from './usuario/usuario.component';

const routes: Routes = [
  {
    path: '',
    component: UsuarioComponent,
    canActivate: [AuthGuard],
    pathMatch: 'full',
  },
  {
    path: 'modal/:modalMode',
    component: UsuarioComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'modal/:modalMode/:id',
    component: UsuarioComponent,
    canActivate: [AuthGuard],
  },
  { path: 'form', component: UsuarioFormComponent, canActivate: [AuthGuard] },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsuariosRoutingModule {}
