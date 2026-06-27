declare global {
  interface Window {
    pywebview?: {
      api: {
        [key: string]: (...args: any[]) => Promise<any>;
      };
    };
  }
}

// Looks up the python API dynamically on invocation to beat race conditions
export const backendAPI = new Proxy({}, {
  get: (_target, prop) => {
    return (...args: any[]) => {
      if (window.pywebview?.api) {
        return window.pywebview.api[prop as string](...args);
      }
      console.warn(`pywebview API not ready yet for method: ${String(prop)}`);
      return Promise.resolve({ success: false });
    };
  }
}) as any;

export interface AppState {
  sites: Array<{
    url: string;
    enabled: boolean;
  }>;
  master_on?: boolean;
  [key: string]: any;
}