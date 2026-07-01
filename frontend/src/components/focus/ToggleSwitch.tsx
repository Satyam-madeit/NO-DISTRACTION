interface ToggleSwitchProps {
  checked: boolean;
  size: 'master' | 'site';
  onChange: (checked: boolean) => void;
}

export function ToggleSwitch({ checked, size, onChange }: ToggleSwitchProps) {
  const isMaster = size === 'master';

  return (
    <label className="relative inline-flex items-center cursor-pointer group">
      <input
        checked={checked}
        className="sr-only peer"
        onChange={(event) => onChange(event.currentTarget.checked)}
        type="checkbox"
      />
      <div
        className={`toggle-bg bg-surface-container-highest rounded-full transition-all ${
          isMaster
            ? 'w-16 h-8 border border-white/10 group-hover:border-white/20'
            : 'w-10 h-5'
        }`}
      />
      <div
        className={`toggle-dot absolute bg-white rounded-full shadow-md ${
          isMaster ? 'left-1 top-1 w-6 h-6' : 'left-[3px] top-[3px] w-3.5 h-3.5'
        }`}
      />
    </label>
  );
}
