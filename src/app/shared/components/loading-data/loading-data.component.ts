import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-loading-data',
  templateUrl: 'loading-data.component.html',
  styleUrls: ['loading-data.component.scss'],
})
export class LoadingDataComponent {
  @Input() type: 'sidebar' | 'complete' = 'complete';

  @Input() title = 'ERROR 404';

  @Input() subtitle = 'Página no encontrada';

  @Input() text = 'La página que estás buscando no existe o no está disponible en este momento.';

  @Input() urlText = 'Ir a la página principal';

  @Input() url = '/';
}
