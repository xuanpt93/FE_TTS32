import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Dashboard',
    icon: 'home-outline',
    link: '/admin/dashboard',
    home: true,
  },
  {
    title: 'FEATURES',
    group: true,
  },
  {
    title: 'User',
    icon: 'person-outline',
    link: '/admin/user',
  },
  // {
  //   title: 'Product',
  //   icon: 'globe-2-outline',
  //   link: '/admin/product',
  // },
  {
    title: 'Tin tuyen dung',
    icon: 'globe-2-outline',
    link: '/admin/job',
  },
  {
    title: 'Công việc ứng tuyển',
    icon: 'globe-2-outline',
    link: '/admin/jobRegister',
  },
  // {
  //   title: 'Auth',
  //   icon: 'lock-outline',
  //   children: [
  //     {
  //       title: 'Login',
  //       link: '/auth/login',
  //     },
  //     {
  //       title: 'Register',
  //       link: '/auth/register',
  //     },
  //     {
  //       title: 'Request Password',
  //       link: '/auth/request-password',
  //     },
  //     {
  //       title: 'Reset Password',
  //       link: '/auth/reset-password',
  //     },
  //   ],
  // },
];
