import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@app/shared/guards/auth.guard';
import { PermisoComponent } from './permiso/permiso.component';

const routes: Routes = [
  {
    path: '',
    component: PermisoComponent,
    canActivate: [AuthGuard],
    pathMatch: 'full',
  },
  {
    path: 'modal/:modalMode',
    component: PermisoComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'modal/:modalMode/:id',
    component: PermisoComponent,
    canActivate: [AuthGuard],
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PermisosRoutingModule {}
