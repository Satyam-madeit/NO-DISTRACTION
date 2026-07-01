import type { DeletePopoverState } from './types';

interface DeletePopoverProps {
  popover: DeletePopoverState | null;
  onCancel: () => void;
  onConfirm: (url: string) => void;
}

export function DeletePopover({ popover, onCancel, onConfirm }: DeletePopoverProps) {
  return (
    <div className="fixed inset-0 pointer-events-none z-[100]">
      {popover && (
        <>
          <div className="fixed inset-0 pointer-events-auto" onClick={onCancel} />
          <div
            className="fixed z-[101] w-[260px] bg-surface-container-high border border-white/10 rounded-2xl shadow-2xl p-lg popover-animate pointer-events-auto"
            style={{ top: `${popover.top}px`, left: `${popover.left}px` }}
          >
            <div className="flex flex-col gap-xs">
              <h4 className="font-title-sm text-[16px] text-on-surface font-semibold">Remove website?</h4>
              <p className="text-body-sm text-on-surface-variant leading-normal">
                This website will be removed from your blocked list.
              </p>
              <div className="flex gap-sm mt-md">
                <button
                  className="flex-1 h-9 rounded-xl border border-white/10 hover:bg-white/5 text-on-surface text-[13px] font-medium transition-colors"
                  onClick={onCancel}
                  type="button"
                >
                  Cancel
                </button>
                <button
                  className="flex-1 h-9 rounded-xl bg-danger text-white text-[13px] font-bold shadow-lg hover:brightness-110 active:scale-95 transition-all"
                  onClick={() => onConfirm(popover.url)}
                  type="button"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
