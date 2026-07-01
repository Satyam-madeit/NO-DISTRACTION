import { ToggleSwitch } from './ToggleSwitch';

interface ProtectionCardProps {
  activeCount: number;
  masterOn: boolean;
  onToggle: () => void;
}

export function ProtectionCard({ activeCount, masterOn, onToggle }: ProtectionCardProps) {
  return (
    <section
      className={`hero-card state-transition rounded-2xl border p-4 sm:p-6 ${
        masterOn ? 'bg-surface-container/80 border-primary/25' : 'bg-surface-container/70 border-white/10'
      }`}
    >
      <div className="flex items-center space-x-6">
        <div className="flex aspect-square w-[clamp(76px,18vw,120px)] max-w-[120px] shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-white/20 bg-white shadow-xl">
          <span className="material-symbols-outlined text-[clamp(42px,9vw,72px)] text-on-primary-container">lock</span>
        </div>

        <div className="flex min-w-0 flex-1 flex-col justify-center">
          <h1 className="font-headline-md text-[clamp(24px,5vw,34px)] font-semibold leading-tight text-on-surface">
            Focus Mode
          </h1>
          <p className="mt-1 font-body-sm text-on-surface-variant/75">Stay focused. Block distractions.</p>

          <div className="mt-5 flex flex-col gap-4 rounded-2xl border border-white/10 bg-surface-container-low/80 p-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="min-w-0">
              <div className="flex min-w-0 flex-wrap items-center gap-sm">
            <span
              className={`state-transition px-sm py-[4px] rounded-full font-label-caps text-[10px] tracking-widest border ${
                masterOn
                  ? 'bg-primary/15 text-primary border-primary/30'
                  : 'bg-white/5 text-on-surface-variant border-white/10'
              }`}
            >
              {masterOn ? 'ACTIVE' : 'PAUSED'}
            </span>
            <h2 className="font-title-sm text-[clamp(18px,3vw,22px)] text-on-surface font-semibold leading-6">
              {masterOn ? `${activeCount} Websites Blocked` : 'Protection Paused'}
            </h2>
              </div>
              <p className="mt-2 font-body-sm text-body-md text-on-surface-variant opacity-80">
                {masterOn ? 'Your deep work session is currently running.' : 'Deep work mode is currently inactive.'}
              </p>
            </div>

            <div className="flex shrink-0 items-center justify-end">
              <ToggleSwitch checked={masterOn} onChange={() => onToggle()} size="master" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
