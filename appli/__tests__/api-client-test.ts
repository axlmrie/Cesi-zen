import { Platform } from 'react-native';

import { apiFetch } from '@/lib/api-client';
import { authClient } from '@/lib/auth-client';

jest.mock('@/lib/auth-client', () => ({
  authBaseURL: 'https://api.cesizen.test',
  authClient: {
    getCookie: jest.fn(),
  },
}));

const fetchMock = jest.fn() as jest.MockedFunction<typeof fetch>;
const getCookieMock = authClient.getCookie as jest.MockedFunction<typeof authClient.getCookie>;
const originalFetch = globalThis.fetch;
const originalPlatformOS = Object.getOwnPropertyDescriptor(Platform, 'OS');

function setPlatform(os: typeof Platform.OS) {
  Object.defineProperty(Platform, 'OS', {
    configurable: true,
    value: os,
  });
}

function queueJsonResponse(payload: unknown, ok = true) {
  fetchMock.mockResolvedValueOnce({
    ok,
    json: jest.fn().mockResolvedValue(payload),
  } as unknown as Response);
}

function queueNonJsonResponse(ok = true) {
  fetchMock.mockResolvedValueOnce({
    ok,
    json: jest.fn().mockRejectedValue(new SyntaxError('Unexpected token')),
  } as unknown as Response);
}

function lastRequestInit(): RequestInit {
  const request = fetchMock.mock.calls.at(-1);

  if (!request) {
    throw new Error('Aucune requete fetch enregistree.');
  }

  return request[1] ?? {};
}

describe('apiFetch', () => {
  beforeEach(() => {
    jest.resetAllMocks();
    getCookieMock.mockReturnValue('');
    globalThis.fetch = fetchMock;
    setPlatform('ios');
  });

  afterAll(() => {
    globalThis.fetch = originalFetch;

    if (originalPlatformOS) {
      Object.defineProperty(Platform, 'OS', originalPlatformOS);
    }
  });

  it('construit l URL complete et renvoie le JSON du serveur', async () => {
    const payload = { entries: [{ id: 'journal-1' }] };
    queueJsonResponse(payload);

    await expect(apiFetch('/api/mobile/journal')).resolves.toEqual(payload);
    expect(fetchMock).toHaveBeenCalledWith(
      'https://api.cesizen.test/api/mobile/journal',
      expect.any(Object),
    );
  });

  it('ajoute le content-type JSON quand une requete contient un body', async () => {
    queueJsonResponse({ created: true });

    await apiFetch('/api/mobile/journal', {
      body: JSON.stringify({ emotionId: 'calme' }),
      headers: { 'x-request-id': 'request-1' },
      method: 'POST',
    });

    const headers = lastRequestInit().headers as Headers;
    expect(headers.get('content-type')).toBe('application/json');
    expect(headers.get('x-request-id')).toBe('request-1');
  });

  it('preserve un content-type explicitement fourni', async () => {
    queueJsonResponse({ uploaded: true });

    await apiFetch('/api/mobile/profile', {
      body: 'plain text',
      headers: { 'Content-Type': 'text/plain' },
      method: 'PUT',
    });

    const headers = lastRequestInit().headers as Headers;
    expect(headers.get('content-type')).toBe('text/plain');
  });

  it('propage le message d erreur retourne par l API', async () => {
    queueJsonResponse({ error: 'Session expiree.' }, false);

    await expect(apiFetch('/api/mobile/profile')).rejects.toThrow('Session expiree.');
  });

  it('utilise une erreur generique si la reponse d erreur n est pas du JSON', async () => {
    queueNonJsonResponse(false);

    await expect(apiFetch('/api/mobile/profile')).rejects.toThrow(
      'Impossible de joindre le serveur CESIZen.',
    );
  });

  it('renvoie un objet vide pour une reponse non JSON reussie', async () => {
    queueNonJsonResponse();

    await expect(apiFetch<Record<string, never>>('/api/mobile/empty')).resolves.toEqual({});
  });

  it('propage une exception reseau sans la remplacer', async () => {
    const networkError = new TypeError('Network request failed');
    fetchMock.mockRejectedValueOnce(networkError);

    await expect(apiFetch('/api/mobile/dashboard')).rejects.toBe(networkError);
  });

  it('ajoute le cookie et omet les credentials sur une plateforme native', async () => {
    setPlatform('android');
    getCookieMock.mockReturnValue('better-auth.session_token=native-token');
    queueJsonResponse({ user: { id: 'user-1' } });

    await apiFetch('/api/mobile/dashboard');

    const request = lastRequestInit();
    const headers = request.headers as Headers;
    expect(getCookieMock).toHaveBeenCalledTimes(1);
    expect(headers.get('cookie')).toBe('better-auth.session_token=native-token');
    expect(request.credentials).toBe('omit');
  });

  it('laisse le navigateur gerer les cookies et inclut les credentials sur le web', async () => {
    setPlatform('web');
    getCookieMock.mockReturnValue('better-auth.session_token=should-not-be-read');
    queueJsonResponse({ user: { id: 'user-1' } });

    await apiFetch('/api/mobile/dashboard');

    const request = lastRequestInit();
    const headers = request.headers as Headers;
    expect(getCookieMock).not.toHaveBeenCalled();
    expect(headers.has('cookie')).toBe(false);
    expect(request.credentials).toBe('include');
  });
});
