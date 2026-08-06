// Lightweight browser-storage persistence used when Supabase isn't configured.
// Keeps CRM data (leads, tasks, etc.) durable across reloads without a backend.

export function loadLocal<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

export function saveLocal<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Storage full or unavailable (private browsing, etc.) — fail silently.
  }
}
