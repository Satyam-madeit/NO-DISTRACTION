import type { AppState } from '../../api/bridge';
import type { FocusDashboardProps } from './types';
import { SiteRow } from './SiteRow';

interface SiteListProps {
  masterOn: boolean;
  sites: AppState['sites'];
  onSiteToggle: FocusDashboardProps['onSiteToggle'];
  onRequestDelete: FocusDashboardProps['onRequestDelete'];
}

export function SiteList({ masterOn, sites, onSiteToggle, onRequestDelete }: SiteListProps) {
  return (
    <section className="flex min-h-0 flex-1 flex-col gap-md rounded-2xl border border-white/10 bg-surface-container/50 p-4">
      <h3 className="font-label-caps text-[11px] text-on-surface-variant/70 tracking-[0.1em]">
        BLOCKED WEBSITES
      </h3>
      <div className="min-h-0 flex-1 space-y-sm overflow-visible">
        {sites.map((site) => (
          <SiteRow
            key={site.url}
            masterOn={masterOn}
            onRequestDelete={onRequestDelete}
            onToggle={onSiteToggle}
            site={site}
          />
        ))}
      </div>
    </section>
  );
}
