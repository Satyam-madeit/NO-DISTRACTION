import type { AppState } from '../api/bridge';

export const previewState: AppState = {
  master_on: true,
  sites: [
    { url: 'youtube.com', enabled: true },
    { url: 'instagram.com', enabled: true },
    { url: 'twitter.com', enabled: true },
    { url: 'reddit.com', enabled: true },
  ],
};

export const toSnakeCase = (value: string) => value.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);

export const canCallBackend = (methodName: string) => {
  const api = window.pywebview?.api;
  if (!api) return false;

  const snakeName = toSnakeCase(methodName);
  return typeof api[snakeName] === 'function' || typeof api[methodName] === 'function';
};

export const normalizeState = (value: any): AppState | null => {
  const next = value?.state ?? value;
  if (!next || !Array.isArray(next.sites)) return null;

  return {
    ...next,
    master_on: next.master_on ?? true,
  };
};

export const formatUrl = (value: string) =>
  value.trim().toLowerCase().replace('https://', '').replace('http://', '').split('/')[0];
