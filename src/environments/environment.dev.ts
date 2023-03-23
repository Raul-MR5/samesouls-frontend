import { common } from './common';

export const environment = {
  ...common,

  production: false,
  desarollo: true,
  preproduccion: false,
  local: true,
  name: 'DESARROLLO',

  backUrl: 'http://as01-arquitectos-dev.odecgandia.es:8080/base',
  apiUrl: 'http://as01-arquitectos-dev.odecgandia.es:8080/base/api/v1',
};
