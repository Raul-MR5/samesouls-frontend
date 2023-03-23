import { common } from './common';

export const environment = {
  ...common,

  production: false,
  desarollo: false,
  preproduccion: true,
  local: true,
  name: 'PREPRODUCCIÓN',

  backUrl: 'https://guiabase-pre.odec.es/base',
  apiUrl: 'https://guiabase-pre.odec.es/base/api/v1',
};
