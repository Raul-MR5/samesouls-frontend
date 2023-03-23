import { Component, Input } from '@angular/core';
import { Foto } from '@app/shared/models/foto.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-imagenes-view',
  templateUrl: './imagenes-view.component.html',
  styleUrls: ['./imagenes-view.component.scss'],
})
export class ImagenesViewComponent {
  @Input() fotos: Foto[] = [];

  @Input() loading$: Observable<boolean>;

  responsiveOptions: unknown[] = [
    {
      breakpoint: '1024px',
      numVisible: 5,
    },
    {
      breakpoint: '768px',
      numVisible: 3,
    },
    {
      breakpoint: '560px',
      numVisible: 1,
    },
  ];

  displayCustom = false;

  activeIndex = 0;

  imageClick(index: number) {
    this.activeIndex = index;
    this.displayCustom = true;
  }
}
