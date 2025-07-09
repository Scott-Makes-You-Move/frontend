// TODO: Uncomment this when you need to use global page props with locale. This is currently not used in the app, so it's commented out to avoid confusion. It can be uncommented when needed for locale-based routing or other purposes.
// import type { SiteLocale } from '@/graphql/types/graphql';

/* export type GlobalPageProps = {
  params: {
    locale: SiteLocale;
  };
};

export function buildUrl(globalPageProps: GlobalPageProps, path?: string) {
  return `/${globalPageProps.params.locale}${path || ''}`;
} */

export function buildUrl(path?: string) {
  return `/${path || ''}`;
}
