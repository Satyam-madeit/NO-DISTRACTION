import type { AppState } from '../../api/bridge';
import type { MouseEvent } from 'react';
import { ToggleSwitch } from './ToggleSwitch';

interface SiteRowProps {
  masterOn: boolean;
  site: AppState['sites'][number];
  onToggle: (url: string, enabled: boolean) => void;
  onRequestDelete: (event: MouseEvent<HTMLButtonElement>, url: string) => void;
}

export function SiteRow({ masterOn, site, onToggle, onRequestDelete }: SiteRowProps) {
  return (
    <div className="site-card group w-full bg-surface-container-low/90 border border-white/10 rounded-xl p-4 flex items-center justify-between gap-md">
      <div className="flex min-w-0 flex-1 items-center gap-sm sm:gap-md">
        <img
          alt={site.url}
          className="w-[clamp(34px,7vw,42px)] h-[clamp(34px,7vw,42px)] rounded-lg shrink-0 bg-white/5"
          onError={(event) => {
            event.currentTarget.src = 'https://www.google.com/s2/favicons?sz=128&domain=example.com';
          }}
          src={`https://www.google.com/s2/favicons?sz=128&domain=${site.url}`}
        />
        <div className="min-w-0 flex-1 leading-none">
          <p className="font-body-md text-on-surface font-medium truncate">{site.url}</p>
          <p className="mt-1.5 text-[12px] text-on-surface-variant/60">
            {site.enabled && masterOn ? 'Blocked' : 'Disabled'}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-sm sm:gap-md shrink-0">
        <ToggleSwitch checked={site.enabled} onChange={(enabled) => onToggle(site.url, enabled)} size="site" />
        <button
          className="trash-btn material-symbols-outlined text-on-surface-variant/40 p-1.5 rounded-lg text-[18px]"
          onClick={(event) => onRequestDelete(event, site.url)}
          type="button"
        >
          delete
        </button>
      </div>
    </div>
  );
}
