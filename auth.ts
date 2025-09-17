// auth.ts
import jwt, { JwtPayload } from 'jsonwebtoken';
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { decodeToken } from 'react-jwt';
import type { NextAuthConfig } from 'next-auth';

import { ApiService } from './lib/api-service';
import { LoginResponse } from './types/login';
import { IUser } from './types/user';

const NEXTAUTH_URL = process.env.NEXTAUTH_URL_INTERNAL;
const tenDayInSecond = 24 * 60 * 60;

console.log('NEXTAUTH_URL', NEXTAUTH_URL);

const api = new ApiService(NEXTAUTH_URL || 'http://localhost:3000');

const config = {
  providers: [
    CredentialsProvider({
      id: 'promotor',
      type: 'credentials',
      credentials: {},
      async authorize(credentials) {
        const { email, password, token } = credentials as {
          email: string;
          password: string;
          token?: string;
        };

        let user: IUser;

        if (token) {
          user = decodeToken(token) as IUser;
          user.token = token;
          return user as any;
        }

        const authResponse = await api.post<LoginResponse, any>('/auth/login', {
          email: email,
          password
        });

        console.log('authResponse', authResponse);

        if (authResponse.error) {
          throw new Error(authResponse.message);
        }

        user = decodeToken(authResponse.data.token) as IUser;
        user.token = authResponse.data.token;

        return user as any;
      }
    })
  ],
  session: {
    strategy: 'jwt',
    maxAge: tenDayInSecond
  },
  jwt: {
    maxAge: tenDayInSecond
  },
  pages: {
    signIn: '/fr/login'
  },
  callbacks: {
    async jwt(params: any) {
      if (params.trigger === 'update') {
        return { ...params.token, ...params.session.user };
      }
      // Si user existe, on récupère les infos du token API
      if (params.user?.sub) {
        params.token.email = params.user.email;
        params.token.nom = params.user.nom;
        params.token.prenom = params.user.prenom;
        params.token.role = params.user.role;
        params.token.contact = params.user.contact;
        params.token.firstConnexion = params.user.firstConnexion;
        params.token.sessionTimeOut = params.user.sessionTimeOut;
        params.token.locked = params.user.locked;
        params.token.token = params.user.token;
      }

      // Vérifier expiration du token
      if (params.token.token) {
        try {
          const decoded = jwt.decode(
            params.token.token as string
          ) as JwtPayload;
          const now = Math.floor(Date.now() / 1000);
          if (decoded?.exp && decoded.exp < now) {
            console.log('Token expired');
            // Note: signOut ne peut pas être appelé ici, retourner un token vide
            return {};
          }
        } catch (error) {
          console.error('Error decoding token:', error);
          return {};
        }
      }

      return params.token;
    },

    async session({ session, token }: { session: any; token: any }) {
      if (session.user) {
        session.user.email = token.email;
        session.user.nom = token.nom;
        session.user.prenom = token.prenom;
        session.user.role = token.role;
        session.user.contact = token.contact;
        session.user.firstConnexion = token.firstConnexion;
        session.user.sessionTimeOut = token.sessionTimeOut;
        session.user.locked = token.locked;
        session.user.token = token.token;
      }

      // Vérifier expiration du token côté session
      if (token.token) {
        try {
          const decoded = jwt.decode(token.token) as JwtPayload;
          const now = Math.floor(Date.now() / 1000);
          if (decoded?.exp && decoded.exp < now) {
            console.log('Token expired in session');
            // Retourner null pour forcer la déconnexion
            return null;
          }
        } catch (error) {
          console.error('Error decoding token in session:', error);
          return null;
        }
      }

      return session;
    }
  },
  redirectProxyUrl: NEXTAUTH_URL
} satisfies NextAuthConfig;

export const {
  handlers,
  auth,
  signIn,
  signOut: nextAuthSignOut
} = NextAuth(config);
