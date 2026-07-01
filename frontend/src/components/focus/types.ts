import type { AppState } from '../../api/bridge';
import type { FormEvent, MouseEvent } from 'react';

export type ToastType = 'success' | 'warning';

export interface Toast {
  id: number;
  message: string;
  type: ToastType;
}

export interface DeletePopoverState {
  url: string;
  top: number;
  left: number;
}

export interface FocusDashboardProps {
  state: AppState;
  newUrl: string;
  toasts: Toast[];
  popover: DeletePopoverState | null;
  onNewUrlChange: (value: string) => void;
  onAddSite: (event: FormEvent) => void;
  onMasterToggle: () => void;
  onSiteToggle: (url: string, enabled: boolean) => void;
  onRequestDelete: (event: MouseEvent<HTMLButtonElement>, url: string) => void;
  onCancelDelete: () => void;
  onConfirmDelete: (url: string) => void;
  onMinimize: () => void;
  onClose: () => void;
}
