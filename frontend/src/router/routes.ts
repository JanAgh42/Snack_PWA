import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/app',
    component: () => import('layouts/ApplicationLayout.vue'),
    children: [
      {
        path: '',
        name: 'Index',
        component: () => import('pages/IndexPage.vue'),
      },
      {
        path: 'profile',
        name: 'Profile',
        component: () => import('pages/ProfilePage.vue'),
      },
      {
        path: 'settings',
        name: 'Settings',
        component: () => import('pages/SettingsPage.vue'),
      },
    ],
  },
  {
    path: '/',
    component: () => import('layouts/InitialLayout.vue'),
    children: [
      {
        path: '',
        name: 'Initial',
        component: () => import('pages/InitialPage.vue'),
      },
      {
        path: 'login',
        name: 'Login',
        component: () => import('pages/LoginPage.vue'),
      },
      {
        path: 'register',
        name: 'Register',
        component: () => import('pages/RegisterPage.vue'),
      },
    ],
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
