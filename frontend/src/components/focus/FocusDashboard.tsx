import { AddSiteDock } from './AddSiteDock';
import { DeletePopover } from './DeletePopover';
import { ProtectionCard } from './ProtectionCard';
import { SiteList } from './SiteList';
import { ToastViewport } from './ToastViewport';
import type { FocusDashboardProps } from './types';
import { WindowTitleBar } from './WindowTitleBar';

export function FocusDashboard({
  state,
  newUrl,
  toasts,
  popover,
  onNewUrlChange,
  onAddSite,
  onMasterToggle,
  onSiteToggle,
  onRequestDelete,
  onCancelDelete,
  onConfirmDelete,
  onMinimize,
  onClose,
}: FocusDashboardProps) {
  const masterOn = state.master_on ?? true;
  const activeCount = state.sites.filter((site) => site.enabled).length;

  return (
    <div className="w-full h-screen min-w-[400px] min-h-[500px] overflow-y-auto bg-background">
      <ToastViewport toasts={toasts} />
      <DeletePopover onCancel={onCancelDelete} onConfirm={onConfirmDelete} popover={popover} />

      <main className="w-full min-h-full mica-surface flex flex-col fluent-shadow relative border border-white/5 overflow-hidden">
        <WindowTitleBar onClose={onClose} onMinimize={onMinimize} />

        <div className="z-10 flex-1 min-h-0 overflow-y-auto custom-scrollbar px-md pb-md pt-[72px] sm:px-lg sm:pb-lg">
          <div className="mx-auto flex w-full max-w-2xl flex-col gap-lg sm:gap-xl">
          <ProtectionCard activeCount={activeCount} masterOn={masterOn} onToggle={onMasterToggle} />
          <SiteList
            masterOn={masterOn}
            onRequestDelete={onRequestDelete}
            onSiteToggle={onSiteToggle}
            sites={state.sites}
          />
          </div>
        </div>

        <AddSiteDock onChange={onNewUrlChange} onSubmit={onAddSite} value={newUrl} />
      </main>
    </div>
  );
}
