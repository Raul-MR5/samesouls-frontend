import { Permiso } from '../../permisos/models/permiso.model';

export interface Menu {
  id?: number | any;
  icono: string | any;
  nombre: string | any;
  ruta?: string | any;
  menu?: Menu | any;
  menus?: Menu[] | any;
  permiso?: Permiso | any;
  orden?: number | any;
}
