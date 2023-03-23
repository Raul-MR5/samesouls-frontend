import { Rol } from '../../roles/models/rol.model';

export interface Usuario {
  id?: number;
  username: string;
  password?: string;
  nombre: string;
  apellidos: string;
  correo: string;
  activo: boolean;
  fecAlta: Date;
  fecBaja?: Date;
  rol?: Rol;
  token?: string;
}
