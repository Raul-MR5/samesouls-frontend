import { NgModule } from '@angular/core';
import { CopyOfArrayPipe } from '../pipes/copy-of-array.pipe';
import { CutTextPipe } from '../pipes/cut-text.pipe';
import { FileToPhotoPipe } from '../pipes/file-to-photo.pipe';
import { IsRequiredPipe } from '../pipes/is-required.pipe';
import { KilometerToMeterPipe } from '../pipes/kilometer-to-meter.pipe';
import { SafePipe } from '../pipes/safe.pipe';
import { ToDatePipe } from '../pipes/to-date.pipe';
import { TransformBase64ToSrc } from '../pipes/transform-base64-to-src.pipe';

@NgModule({
  declarations: [
    FileToPhotoPipe,
    SafePipe,
    TransformBase64ToSrc,
    CopyOfArrayPipe,
    CutTextPipe,
    KilometerToMeterPipe,
    ToDatePipe,
    IsRequiredPipe,
  ],
  imports: [],
  providers: [],
  exports: [
    FileToPhotoPipe,
    SafePipe,
    TransformBase64ToSrc,
    CopyOfArrayPipe,
    CutTextPipe,
    KilometerToMeterPipe,
    ToDatePipe,
    IsRequiredPipe,
  ],
})
export class PipesModule {}
