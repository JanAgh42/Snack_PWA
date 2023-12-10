import { boot } from 'quasar/wrappers';
import { RouteLocationNormalized, RouteLocationRaw } from 'vue-router';

import authManager from 'src/api/managers/authManager';
import { useAuthenticationStore } from 'src/stores/authenticationStore';

declare module 'vue-router' {
  interface RouteMeta {
    requiresAuth?: boolean;
    guestOnly?: boolean;
  }
}

const loginRoute = (from: RouteLocationNormalized): RouteLocationRaw => {
  return {
    name: 'Login',
    query: { redirect: from.fullPath },
  };
};

// this boot file wires together authentication handling with router
export default boot(({ router, store }) => {
  // if the token was removed from storage, redirect to login
  authManager.onLogout(() => {
    router.push(loginRoute(router.currentRoute.value));
  });

  // add route guard to check auth user
  router.beforeEach(async (route) => {
    const authStore = useAuthenticationStore(store);

    const isAuthenticated = authStore.isUserAuthenticated
      ? true
      : await authStore.verifyAndGetCurrentUser();

    if (route.meta.requiresAuth && !isAuthenticated) return loginRoute(route);

    if (route.meta.guestOnly && isAuthenticated) return { name: 'Index' };
  });
});
