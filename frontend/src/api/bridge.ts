declare global {
  interface Window {
    pywebview?: {
      api: {
        [key: string]: (...args: any[]) => Promise<any>;
      };
    };
  }
}

// Smart proxy that translates JS camelCase to Python snake_case automatically
export const backendAPI = new Proxy({}, {
  get: (_target, prop) => {
    return (...args: any[]) => {
      if (window.pywebview?.api) {
        const camelName = prop as string;
        // Convert camelCase (getInitialState) to snake_case (get_initial_state)
        const snakeName = camelName.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`);

        // 1. Try python snake_case version first
        if (typeof window.pywebview.api[snakeName] === 'function') {
          return window.pywebview.api[snakeName](...args);
        }
        // 2. Fall back to literal camelCase match if it exists
        if (typeof window.pywebview.api[camelName] === 'function') {
          return window.pywebview.api[camelName](...args);
        }

        // 3. Safe fallback if neither exists so the app doesn't crash
        console.error(`Method ${camelName} (or ${snakeName}) not found on Python API. Available methods:`, Object.keys(window.pywebview.api));
        return Promise.resolve(null);
      }
      
      console.warn(`pywebview API not ready yet for method: ${String(prop)}`);
      return Promise.resolve(null);
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