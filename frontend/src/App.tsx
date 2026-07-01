import { FocusDashboard } from './components/focus/FocusDashboard';
import { LoadingScreen } from './components/focus/LoadingScreen';
import { useFocusController } from './hooks/useFocusController';

export default function App() {
  const focus = useFocusController();

  if (!focus.state) {
    return <LoadingScreen />;
  }

  return (
    <FocusDashboard
      newUrl={focus.newUrl}
      onAddSite={focus.handleAddSite}
      onCancelDelete={focus.cancelDelete}
      onClose={focus.closeWindow}
      onConfirmDelete={focus.confirmDelete}
      onMasterToggle={focus.handleMasterToggle}
      onMinimize={focus.minimizeWindow}
      onNewUrlChange={focus.setNewUrl}
      onRequestDelete={focus.requestDelete}
      onSiteToggle={focus.handleSiteToggle}
      popover={focus.popover}
      state={focus.state}
      toasts={focus.toasts}
    />
  );
}
