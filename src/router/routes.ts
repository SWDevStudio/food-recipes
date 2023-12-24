import { RouteRecordRaw } from 'vue-router';
import MainLayout from 'layouts/MainLayout.vue';
const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: MainLayout,
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') },
      { path: '/editor/:id?', component: () => import('pages/RecipeEditor.vue') },
      { path: '/recipe-list', component: () => import('pages/RecipeList.vue') },
      { path: '/menu-generator', component: () => import('pages/MenuGenerator.vue') }
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
