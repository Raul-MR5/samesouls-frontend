import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-ningun-resultado',
  templateUrl: './ningun-resultado.component.html',
  styleUrls: ['./ningun-resultado.component.scss'],
})
export class NingunResultadoComponent {
  @Input() icon: string;

  @Input() text: string;

  @Input() height: string;
}
