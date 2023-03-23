import { Validators } from '@angular/forms';
import { Coordenadas } from '../models/mapa/Coordenadas.model';
import { ColumnMetadata } from '../models/metadata/column-metadata';

export class Utils {
  public static areEqual(a: any, b: any) {
    if (a === undefined && b === undefined) {
      return true;
    }
    if (a && b) {
      if (a.id === b.id) {
        return true;
      }
      return false;
    }
    return false;
  }

  public static calculateDistance(position1: Coordenadas, position2: Coordenadas): number {
    const R = 6371; // Radius of the earth in km
    const dLat = this.deg2rad(position2.lat - position1.lat); // deg2rad below
    const dLon = this.deg2rad(position2.lon - position1.lon);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.deg2rad(position1.lat)) *
        Math.cos(this.deg2rad(position2.lat)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c; // Distance in km
    return d;
  }

  public static deg2rad(deg: number) {
    return deg * (Math.PI / 180);
  }

  public static calculateMaxWidth(desktopMaxWidth: string): string {
    if (window.screen.width > 500) {
      return desktopMaxWidth;
    }
    return '100%';
  }

  public static addValidators(
    columnsMetadata: ColumnMetadata[],
    formConfig: { [key: string]: any[] },
  ): { [key: string]: any[] } {
    let resultFormConfig = {};
    columnsMetadata.forEach(columnMetadata => {
      const previusValidators = formConfig[columnMetadata.name]
        ? formConfig[columnMetadata.name]
        : [];
      const dataBaseValidators = [];
      if (columnMetadata.validators) {
        if (columnMetadata.validators.length) {
          dataBaseValidators.push(Validators.maxLength(columnMetadata.validators.length));
        }
        if (!columnMetadata.validators.nullable) {
          dataBaseValidators.push(Validators.required);
        }
      }

      resultFormConfig = {
        ...resultFormConfig,
        [columnMetadata.name]: [undefined, [...previusValidators, ...dataBaseValidators]],
      };
    });

    return resultFormConfig;
  }
}
