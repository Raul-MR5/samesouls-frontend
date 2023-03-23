export enum Numero {
  SINGULAR,
  PLURAL,
}
export enum NameMode {
  SCREAMING,
  NORMAL,
}
export enum NameType {
  CAMEL_CASE,
  KEBAB_CASE,
  SNAKE_CASE,
  PASCAL_CASE,
}

export class CommonNames {
  constructor(private singularName: string, private pluralName: string) {}

  public getName(nameType: NameType, numero: Numero, nameMode: NameMode) {
    let name: string;

    switch (numero) {
      case Numero.SINGULAR:
        name = this.singularName;
        break;
      case Numero.PLURAL:
        name = this.pluralName;
        break;
    }

    switch (nameType) {
      case NameType.CAMEL_CASE:
        name = this.toCamelCase(name);
        break;
      case NameType.PASCAL_CASE:
        name = this.toPascalCase(name);
        break;
      case NameType.SNAKE_CASE:
        name = this.toSnakeCase(name);
        break;
      case NameType.KEBAB_CASE:
        break;
    }

    switch (nameMode) {
      case NameMode.SCREAMING:
        name.toUpperCase();
        break;
      case NameMode.NORMAL:
        break;
    }

    return name;
  }

  toCamelCase(kebabCase: string) {
    const arr = kebabCase.split('-');
    const capital = arr.map((item, index) =>
      index ? item.charAt(0).toUpperCase() + item.slice(1).toLowerCase() : item.toLowerCase(),
    );
    return capital.join('');
  }

  toPascalCase(kebabCase: string) {
    let result: string = kebabCase;
    const arr = kebabCase.split('-');
    const last = arr[arr.length - 1];
    result = result.replace(/-\w/g, x => `${x[1].toUpperCase()}`);
    result =
      result[0].toUpperCase() +
      result.substring(1, result.length - last.length) +
      last.toUpperCase();
    return result;
  }

  toSnakeCase(kebabCase: string) {
    const result = kebabCase.replace(/-/g, '_');
    return result;
  }
}
