import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'kilometerToMeter',
})
export class KilometerToMeterPipe implements PipeTransform {
  transform(kilometer: number): number {
    const kmToMeter = 1000;

    return kilometer * kmToMeter;
  }
}
