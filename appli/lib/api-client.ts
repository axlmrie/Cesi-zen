import { Platform } from 'react-native';

import { authBaseURL, authClient } from '@/lib/auth-client';

export async function apiFetch<T>(path: string, init: RequestInit = {}): Promise<T> {
  const headers = new Headers(init.headers);

  if (init.body && !headers.has('content-type')) {
    headers.set('content-type', 'application/json');
  }

  if (Platform.OS !== 'web') {
    const cookie = authClient.getCookie();
    if (cookie) {
      headers.set('cookie', cookie);
    }
  }

  const response = await fetch(`${authBaseURL}${path}`, {
    ...init,
    headers,
    credentials: Platform.OS === 'web' ? 'include' : 'omit',
  });

  const payload = (await response.json().catch(() => ({}))) as T & { error?: string };

  if (!response.ok) {
    throw new Error(payload.error ?? 'Impossible de joindre le serveur CESIZen.');
  }

  return payload;
}
