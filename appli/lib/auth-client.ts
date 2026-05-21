import { expoClient } from '@better-auth/expo/client';
import { createAuthClient } from 'better-auth/react';
import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';

const fallbackBaseURL = Platform.select({
  android: 'http://10.0.2.2:3000',
  default: 'http://localhost:3000',
});

export const authBaseURL =
  process.env.EXPO_PUBLIC_AUTH_BASE_URL ?? process.env.EXPO_PUBLIC_API_URL ?? fallbackBaseURL;

export const authClient = createAuthClient({
  baseURL: authBaseURL,
  plugins: [
    expoClient({
      scheme: 'appli',
      storagePrefix: 'cesizen',
      storage: SecureStore,
      cookiePrefix: 'better-auth',
    }),
  ],
});

export type Session = typeof authClient.$Infer.Session;
