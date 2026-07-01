export function LoadingScreen() {
  return (
    <div className="w-full h-screen min-w-[400px] min-h-[500px] overflow-y-auto bg-background">
      <main className="w-full min-h-full mica-surface flex items-center justify-center fluent-shadow relative border border-white/5">
        <p className="font-body-sm text-on-surface-variant opacity-60">Loading Focus Mode...</p>
      </main>
    </div>
  );
}
