import type { FormEvent } from 'react';

interface AddSiteDockProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: (event: FormEvent) => void;
}

export function AddSiteDock({ value, onChange, onSubmit }: AddSiteDockProps) {
  return (
    <footer className="z-30 shrink-0 p-md sm:p-lg bg-surface-container-high border-t border-white/10 shadow-[0_-12px_40px_rgba(0,0,0,0.3)]">
      <form className="mx-auto flex w-full max-w-2xl flex-col sm:flex-row gap-sm sm:gap-md items-stretch sm:items-center" onSubmit={onSubmit}>
        <div className="relative min-w-0 flex-1 group">
          <span className="material-symbols-outlined absolute left-lg top-1/2 -translate-y-1/2 text-on-surface-variant group-focus-within:text-primary transition-colors text-[22px]">
            language
          </span>
          <input
            className="h-[52px] sm:h-[56px] w-full bg-surface border border-white/10 rounded-2xl pl-[54px] pr-lg py-md text-body-md focus:border-primary/50 focus:ring-4 focus:ring-primary/10 transition-all outline-none placeholder:text-on-surface-variant/30"
            onChange={(event) => onChange(event.currentTarget.value)}
            placeholder="Add website (e.g. facebook.com)..."
            type="text"
            value={value}
          />
        </div>
        <button
          className="h-[52px] sm:h-[56px] w-full sm:w-auto sm:min-w-[96px] bg-primary text-on-primary-container font-bold px-lg rounded-2xl shadow-xl hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-sm"
          type="submit"
        >
          <span className="material-symbols-outlined text-[24px]">add</span>
          Add
        </button>
      </form>
      <div className="mx-auto mt-md sm:mt-lg flex w-full max-w-2xl justify-center items-center text-[11px] text-on-surface-variant/40 font-label-caps tracking-[0.2em] opacity-80">
        <span>FOCUS MODE V1.1</span>
      </div>
    </footer>
  );
}
