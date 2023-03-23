import { Permiso } from '../../permisos/models/permiso.model';

export interface Rol {
  id?: number;
  codigo: string;
  descripcion: string;
  permisos: Permiso[];
}
