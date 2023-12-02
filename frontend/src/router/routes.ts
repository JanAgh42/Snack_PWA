import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/app',
    name: 'App',
    meta: { requiresAuth: true },
    component: () => import('layouts/ApplicationLayout.vue'),
    children: [
      {
        path: '',
        name: 'Index',
        meta: { requiresAuth: true },
        component: () => import('pages/IndexPage.vue'),
      },
      {
        path: 'profile',
        name: 'Profile',
        meta: { requiresAuth: true },
        component: () => import('pages/ProfilePage.vue'),
      },
      {
        path: 'settings',
        name: 'Settings',
        meta: { requiresAuth: true },
        component: () => import('pages/SettingsPage.vue'),
      },
    ],
  },
  {
    path: '/',
    name: 'Initial',
    meta: { guestOnly: true },
    component: () => import('layouts/InitialLayout.vue'),
    children: [
      {
        path: '',
        name: 'Main',
        meta: { guestOnly: true },
        component: () => import('pages/InitialPage.vue'),
      },
      {
        path: 'login',
        name: 'Login',
        meta: { guestOnly: true },
        component: () => import('pages/LoginPage.vue'),
      },
      {
        path: 'register',
        name: 'Register',
        meta: { guestOnly: true },
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
