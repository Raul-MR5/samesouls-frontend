import { configuration } from 'src/assets/configuration';

export const common = {
  ...configuration,
  defaultRequestFilter: {
    size: 10,
    page: 0,
    sort: [],
    filter: [],
  },
  defaultPublicRequestFilter: {
    size: 2,
    page: 0,
    sort: [],
    filter: [],
  },
  defaultBuscadorRequestFilter: {
    size: 4,
    page: 0,
    sort: [],
    filter: [],
  },

  defaultCurrentLocation: {
    lat: 39.469773,
    lon: -0.376897,
  },
  defaultMapPosition: {},

  apiKey:
    'pk.eyJ1IjoiZGFyYXF1ZSIsImEiOiJjbDFnNnAzcm0xODZ1M3BwM2k0ampiYjh1In0.b0xjGBSOGpjJM2EZ5Pl3mg',
  styleMapbox: 'mapbox://styles/daraque/cl42szow1002d14pa61lcsq90/draft',

  base: {
    siglas: 'BASE',
    nombre: 'Colegio Territorial de Arquitectos de Valencia',
    direccion: 'Calle Hernán Cortés, 6, 46004 Valencia',
    telefono: '963 51 67 37',
    email: 'secretaria@base.es',
    web: 'arquitectosdevalencia.es',
    webUrl: 'http://arquitectosdevalencia.es/',
    app: {
      nombre: 'Guía Arquitectura Valencia',
      playStore: 'https://es.wikipedia.org/wiki/Google_Play',
      appleStore: 'https://es.wikipedia.org/wiki/Google_Play',
    },
    avisoLegalUrl: 'http://arquitectosdevalencia.es/',
    politicaCookiesUrl: 'http://arquitectosdevalencia.es/',
    politicaPrivacidadUrl: 'http://arquitectosdevalencia.es/',
  },
};
