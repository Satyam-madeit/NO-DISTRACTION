import { useEffect, useRef, useState } from 'react';
import type { FormEvent, MouseEvent } from 'react';
import { backendAPI } from '../api/bridge';
import type { AppState } from '../api/bridge';
import type { DeletePopoverState, Toast, ToastType } from '../components/focus/types';
import { canCallBackend, formatUrl, normalizeState, previewState } from '../utils/focusState';

export function useFocusController() {
  const [state, setState] = useState<AppState | null>(null);
  const [newUrl, setNewUrl] = useState('');
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [popover, setPopover] = useState<DeletePopoverState | null>(null);
  const toastId = useRef(0);
  const hasRequestedInitialState = useRef(false);

  useEffect(() => {
    const loadInitialState = () => {
      if (hasRequestedInitialState.current) return;

      if (!canCallBackend('getInitialState')) {
        if (import.meta.env.DEV) {
          setState(previewState);
        }
        return;
      }

      hasRequestedInitialState.current = true;
      backendAPI.getInitialState().then((res: any) => {
        const next = normalizeState(res);
        if (next) setState(next);
      });
    };

    if (window.pywebview) {
      loadInitialState();
    } else {
      window.addEventListener('pywebviewready', loadInitialState);
    }

    return () => window.removeEventListener('pywebviewready', loadInitialState);
  }, []);

  const showToast = (message: string, type: ToastType = 'success') => {
    const id = toastId.current++;
    setToasts((prev) => [...prev, { id, message, type }]);
    window.setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, 3000);
  };

  const applyResponseState = (res: any) => {
    const next = normalizeState(res);
    if (next) setState(next);
    return next;
  };

  const handleMasterToggle = async () => {
    if (!state) return;

    const enabled = !(state.master_on ?? true);
    if (!canCallBackend('setMasterOn')) {
      setState({ ...state, master_on: enabled });
      if (enabled) {
        showToast('Focus Mode enabled', 'success');
        window.setTimeout(() => showToast('Restart browser to apply changes', 'warning'), 1500);
      }
      return;
    }

    const res = await backendAPI.setMasterOn(enabled);
    const next = applyResponseState(res);

    if (!next) {
      setState({ ...state, master_on: enabled });
    }

    if (enabled) {
      showToast('Focus Mode enabled', 'success');
      window.setTimeout(() => showToast('Restart browser to apply changes', 'warning'), 1500);
    }
  };

  const handleSiteToggle = async (url: string, enabled: boolean) => {
    if (!state) return;

    if (!canCallBackend('toggleSite')) {
      setState({
        ...state,
        sites: state.sites.map((site) => (site.url === url ? { ...site, enabled } : site)),
      });
      return;
    }

    const res = await backendAPI.toggleSite(url, enabled);
    const next = applyResponseState(res);

    if (!next) {
      setState({
        ...state,
        sites: state.sites.map((site) => (site.url === url ? { ...site, enabled } : site)),
      });
    }
  };

  const handleAddSite = async (event: FormEvent) => {
    event.preventDefault();

    const url = formatUrl(newUrl);
    if (!url) return;
    if (!state) return;

    if (!canCallBackend('addSite')) {
      setState({
        ...state,
        sites: [{ url, enabled: true }, ...state.sites.filter((site) => site.url !== url)],
      });
      setNewUrl('');
      showToast('Website added', 'success');
      return;
    }

    const res = await backendAPI.addSite(url);
    const next = applyResponseState(res);

    if (next) {
      setNewUrl('');
      showToast('Website added', 'success');
    }
  };

  const requestDelete = (event: MouseEvent<HTMLButtonElement>, url: string) => {
    const rect = event.currentTarget.getBoundingClientRect();
    setPopover({
      url,
      top: Math.max(12, rect.top - 10),
      left: Math.max(12, Math.min(rect.left - 275, window.innerWidth - 272)),
    });
  };

  const confirmDelete = async (url: string) => {
    setPopover(null);

    if (!state) return;

    if (!canCallBackend('removeSite')) {
      setState({
        ...state,
        sites: state.sites.filter((site) => site.url !== url),
      });
      showToast('Website removed', 'success');
      return;
    }

    const res = await backendAPI.removeSite(url);
    const next = applyResponseState(res);
    if (next) showToast('Website removed', 'success');
  };

  const minimizeWindow = () => {
    if (!canCallBackend('minimize')) return;
    backendAPI.minimize().then(() => undefined);
  };

  const closeWindow = () => {
    if (!canCallBackend('closeWindow')) return;
    backendAPI.closeWindow().then(() => undefined);
  };

  return {
    state,
    newUrl,
    toasts,
    popover,
    setNewUrl,
    handleAddSite,
    handleMasterToggle,
    handleSiteToggle,
    requestDelete,
    cancelDelete: () => setPopover(null),
    confirmDelete,
    minimizeWindow,
    closeWindow,
  };
}
