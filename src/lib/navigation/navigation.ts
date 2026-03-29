import type { NavbarAppearance, NavbarCTA, NavbarLink } from '@/components/Navbar';

export type NavContext = 'public-landing' | 'public-standard' | 'authenticated-app';
export type RouteMatch = 'exact' | 'startsWith';

export type RouteMeta = {
  protected: boolean;
  navContext: NavContext;
  showNavbar?: boolean;
  showFooter?: boolean;
};

export type NavConfig = {
  context: NavContext;
  appearance: NavbarAppearance;
  links: NavbarLink[];
  cta?: NavbarCTA;
  showLogout: boolean;
};

type RouteRule = {
  path: string;
  match: RouteMatch;
  meta: RouteMeta;
};

const ROUTE_RULES: RouteRule[] = [
  {
    path: '/',
    match: 'exact',
    meta: {
      protected: false,
      navContext: 'public-landing',
      showNavbar: true,
      showFooter: true,
    },
  },
  {
    path: '/about',
    match: 'exact',
    meta: {
      protected: false,
      navContext: 'public-standard',
      showNavbar: true,
      showFooter: true,
    },
  },
  {
    path: '/contact',
    match: 'exact',
    meta: {
      protected: false,
      navContext: 'public-standard',
      showNavbar: true,
      showFooter: true,
    },
  },
  {
    path: '/faq',
    match: 'exact',
    meta: {
      protected: false,
      navContext: 'public-standard',
      showNavbar: true,
      showFooter: true,
    },
  },
  {
    path: '/pilot-challenge',
    match: 'exact',
    meta: {
      protected: true,
      navContext: 'authenticated-app',
      showNavbar: false,
      showFooter: false,
    },
  },

  // Protected app areas
  {
    path: '/sessions',
    match: 'startsWith',
    meta: {
      protected: true,
      navContext: 'authenticated-app',
      showNavbar: true,
      showFooter: true,
    },
  },
  {
    path: '/leaderboard',
    match: 'startsWith',
    meta: {
      protected: true,
      navContext: 'authenticated-app',
      showNavbar: true,
      showFooter: true,
    },
  },
  {
    path: '/progress-chart',
    match: 'startsWith',
    meta: {
      protected: true,
      navContext: 'authenticated-app',
      showNavbar: true,
      showFooter: true,
    },
  },
  {
    path: '/progress-form',
    match: 'startsWith',
    meta: {
      protected: true,
      navContext: 'authenticated-app',
      showNavbar: true,
      showFooter: true,
    },
  },
  {
    path: '/mini-workouts',
    match: 'startsWith',
    meta: {
      protected: true,
      navContext: 'authenticated-app',
      showNavbar: true,
      showFooter: true,
    },
  },
];

const DEFAULT_ROUTE_META: RouteMeta = {
  protected: true,
  navContext: 'authenticated-app',
  showNavbar: true,
  showFooter: true,
};

const matchesRoute = (pathname: string, rule: RouteRule): boolean => {
  if (rule.match === 'exact') {
    return pathname === rule.path;
  }

  if (pathname === rule.path) {
    return true;
  }

  return pathname.startsWith(`${rule.path}/`);
};

export const resolveRouteMeta = (pathname: string | null): RouteMeta => {
  if (!pathname) {
    return DEFAULT_ROUTE_META;
  }

  const matchedRule = ROUTE_RULES.find((rule) => matchesRoute(pathname, rule));

  return matchedRule?.meta ?? DEFAULT_ROUTE_META;
};

export const getNavConfig = (pathname: string | null): NavConfig => {
  const meta = resolveRouteMeta(pathname);

  switch (meta.navContext) {
    case 'public-landing':
      return {
        context: 'public-landing',
        appearance: 'overlay',
        links: [
          { label: 'Probleem', href: '#probleem', kind: 'anchor' },
          { label: 'Oplossing', href: '#oplossing', kind: 'anchor' },
          { label: 'Voordelen', href: '#voordelen', kind: 'anchor' },
          { label: 'Hoe het werkt', href: '#hoe-het-werkt', kind: 'anchor' },
          { label: 'Over Scott', href: '#over-scott', kind: 'anchor' },
        ],
        cta: {
          label: 'Plan een demo',
          href: '#contact',
          kind: 'anchor',
        },
        showLogout: false,
      };

    case 'public-standard':
      return {
        context: 'public-standard',
        appearance: 'solid',
        links: [
          { label: 'Home', href: '/', kind: 'route' },
          { label: 'About', href: '/about', kind: 'route' },
          { label: 'Contact', href: '/contact', kind: 'route' },
          { label: 'FAQ', href: '/faq', kind: 'route' },
        ],
        cta: {
          label: 'Get started',
          href: '/',
          kind: 'route',
        },
        showLogout: false,
      };

    case 'authenticated-app':
    default:
      return {
        context: 'authenticated-app',
        appearance: 'solid',
        links: [
          { label: 'Sessions', href: '/sessions', kind: 'route' },
          { label: 'Leaderboard', href: '/leaderboard', kind: 'route' },
          { label: 'Progress Chart', href: '/progress-chart', kind: 'route' },
          { label: 'Progress Form', href: '/progress-form', kind: 'route' },
          { label: 'Mini Workouts', href: '/mini-workouts', kind: 'route' },
        ],
        showLogout: true,
      };
  }
};
