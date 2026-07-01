import type { Toast } from './types';

interface ToastViewportProps {
  toasts: Toast[];
}

export function ToastViewport({ toasts }: ToastViewportProps) {
  return (
    <div id="toast-container">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="toast-notification px-lg py-sm rounded-2xl shadow-2xl flex items-center gap-md border border-white/10 min-w-[280px]"
        >
          <span
            className={`material-symbols-outlined text-[20px] font-bold ${
              toast.type === 'warning' ? 'text-warning' : 'text-success'
            }`}
          >
            {toast.type === 'warning' ? 'warning' : 'check_circle'}
          </span>
          <span className="font-body-sm text-on-surface font-medium flex-1">{toast.message}</span>
        </div>
      ))}
    </div>
  );
}
