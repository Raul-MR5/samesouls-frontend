import { common } from './common';

export const environment = {
  ...common,
  production: true,
  desarollo: false,
  preproduccion: false,
  local: true,
  name: 'PRODUCCIÓN',

  backUrl: 'http://as01-arquitectos-pro.odecgandia.es:8080/base',
  apiUrl: 'http://as01-arquitectos-pro.odecgandia.es:8080/base/api/v1',
};
