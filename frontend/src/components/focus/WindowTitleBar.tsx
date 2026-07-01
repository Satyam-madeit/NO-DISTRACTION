interface WindowTitleBarProps {
  onMinimize: () => void;
  onClose: () => void;
}

export function WindowTitleBar({ onMinimize, onClose }: WindowTitleBarProps) {
  return (
    <header className="absolute top-0 right-0 z-40 p-2 flex space-x-2">
      <button className="window-control text-on-surface-variant rounded-lg" onClick={onMinimize} type="button">
          <span className="material-symbols-outlined text-[16px]">minimize</span>
      </button>
      <button className="window-control text-on-surface-variant rounded-lg" type="button">
          <span className="material-symbols-outlined text-[14px]">check_box_outline_blank</span>
      </button>
      <button className="window-control close text-on-surface-variant rounded-lg" onClick={onClose} type="button">
          <span className="material-symbols-outlined text-[18px]">close</span>
      </button>
    </header>
  );
}
