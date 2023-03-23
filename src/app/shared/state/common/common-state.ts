import { ToastMessage } from '@app/shared/models/toast-message';

export interface CommonState<T> {
  entities: T[];
  selectedId: number | undefined;
  count: number;
  loading: boolean;
  message: ToastMessage | undefined;
}
