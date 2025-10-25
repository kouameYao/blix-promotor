import jwt, { JwtPayload } from 'jsonwebtoken';
import NextAuth from 'next-auth';
import type { NextAuthConfig } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { decodeToken } from 'react-jwt';

import { fetchData } from './lib/api';
import { LoginResponse } from './types/login';
import { IUser } from './types/user';

const NEXTAUTH_SECRET =
  process.env.NEXTAUTH_SECRET || 'fallback-secret-for-development-only';
const tenDayInSecond = 10 * 24 * 60 * 60;

const config = {
  secret: NEXTAUTH_SECRET,
  trustHost: true,
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
          return user;
        }

        const data = {
          email: email,
          password: password
        };

        console.log('data', data);

        const authResponse = (await fetchData(
          '/auth/login',
          'POST',
          data
        )) as LoginResponse;
        console.log('authResponse', authResponse);

        // Vérifier si la réponse a une erreur
        if (authResponse.error) {
          console.log('Auth error:', authResponse.message);
          throw new Error(authResponse.message);
        }

        // Vérifier si data existe et contient un token
        if (!authResponse.data || !authResponse.data.token) {
          console.log('No token in response:', authResponse);
          throw new Error('Token manquant dans la réponse');
        }

        user = decodeToken(authResponse.data.token) as IUser;
        user.token = authResponse.data.token;

        return user;
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
  callbacks: {
    async jwt(params: {
      trigger?: string;
      token: any;
      user?: any;
      session?: any;
    }) {
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

        console.log('Session callback - token available:', !!token.token);
      }

      if (token.token) {
        try {
          const decoded = jwt.decode(token.token) as JwtPayload;
          const now = Math.floor(Date.now() / 1000);
          if (decoded?.exp && decoded.exp < now) {
            console.log('Token expired in session');

            return null;
          }
        } catch (error) {
          console.error('Error decoding token in session:', error);
          return null;
        }
      }

      return session;
    }
  }
} satisfies NextAuthConfig;

export const {
  handlers,
  auth,
  signIn,
  signOut: nextAuthSignOut
} = NextAuth(config);
