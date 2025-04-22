import { AuthOptions, TokenSet } from 'next-auth';
import { JWT } from 'next-auth/jwt';
import KeycloakProvider from 'next-auth/providers/keycloak';

const KEYCLOAK_ISSUER = process.env.KEYCLOAK_ISSUER ?? 'http://localhost:8080/realms/smym-dev';
console.log('🚀 ~ KEYCLOAK_ISSUER:', KEYCLOAK_ISSUER);
const KEYCLOAK_CLIENT_ID = process.env.KEYCLOAK_CLIENT_ID ?? 'myclient';
console.log('🚀 ~ KEYCLOAK_CLIENT_ID:', KEYCLOAK_CLIENT_ID);
const KEYCLOAK_CLIENT_SECRET = process.env.KEYCLOAK_CLIENT_SECRET ?? 'myclientsecret';
console.log('🚀 ~ KEYCLOAK_CLIENT_SECRET:', KEYCLOAK_CLIENT_SECRET);
const NEXTAUTH_SECRET = process.env.NEXTAUTH_SECRET ?? 'somesecret';
console.log('🚀 ~ NEXTAUTH_SECRET:', NEXTAUTH_SECRET);

function requestRefreshOfAccessToken(token: JWT) {
  return fetch(`${KEYCLOAK_ISSUER}/protocol/openid-connect/token`, {
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      client_id: KEYCLOAK_CLIENT_ID,
      client_secret: KEYCLOAK_CLIENT_SECRET,
      grant_type: 'refresh_token',
      refresh_token: token.refreshToken!,
    }),
    method: 'POST',
    cache: 'no-store',
  });
}

export const authOptions: AuthOptions = {
  secret: NEXTAUTH_SECRET,
  providers: [
    KeycloakProvider({
      clientId: KEYCLOAK_CLIENT_ID,
      clientSecret: KEYCLOAK_CLIENT_SECRET,
      issuer: KEYCLOAK_ISSUER,
    }),
  ],
  session: {
    strategy: 'jwt',
    maxAge: 60 * 30,
  },
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        token.idToken = account.id_token;
        token.accessToken = account.access_token;
        token.refreshToken = account.refresh_token;
        token.expiresAt = account.expires_at;
        return token;
      }
      if (Date.now() < token.expiresAt! * 1000 - 60 * 1000) {
        return token;
      } else {
        try {
          const response = await requestRefreshOfAccessToken(token);

          const tokens: TokenSet = await response.json();

          if (!response.ok) throw tokens;

          const updatedToken: JWT = {
            ...token,
            idToken: tokens.id_token,
            accessToken: tokens.access_token,
            expiresAt: Math.floor(Date.now() / 1000 + (tokens.expires_in as number)),
            refreshToken: tokens.refresh_token ?? token.refreshToken,
          };
          return updatedToken;
        } catch (error) {
          console.error('Error refreshing access token', error);
          return { ...token, error: 'RefreshAccessTokenError' };
        }
      }
    },
    async session({ session, token }) {
      session.accountId = token.sub;
      session.accessToken = token.accessToken;
      session.error = token.error;
      return session;
    },
  },
};
