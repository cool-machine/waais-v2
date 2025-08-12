export interface NavigationItem {
  name: string;
  path: string;
  children?: NavigationItem[];
  external?: boolean;
}

export const navigation: NavigationItem[] = [
  {
    name: 'Home',
    path: '/',
  },
  {
    name: 'About',
    path: '/about',
  },
  {
    name: 'Contact',
    path: '/contact',
  },
  {
    name: 'Get Involved',
    path: '/get-involved',
    children: [
      {
        name: 'Mentor',
        path: '/get-involved/mentor',
      },
      {
        name: 'Volunteer',
        path: '/get-involved/volunteer',
      },
      {
        name: 'Newsletter',
        path: '/get-involved/newsletter',
      },
      {
        name: 'WhatsApp Group',
        path: '/get-involved/whatsapp',
      },
    ],
  },
  {
    name: 'Startup Community',
    path: '/startup-community',
    children: [
      {
        name: 'Startups',
        path: '/startup-community/startups',
      },
      {
        name: 'Give Back Program',
        path: '/startup-community/give-back',
      },
    ],
  },
  {
    name: 'Community',
    path: '/community',
    external: true,
  },
];