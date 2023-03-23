import { Language } from '@app/features/components/backoffice/tablas/languages/models/language.model';

export interface Translation {
  id: number;
  translation: string;
  language: Language;
  textContent?: TextContent;
}
export interface TextContent {
  id: number;
  translations: Translation[];
}
