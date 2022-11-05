import { createRouter, createWebHistory } from 'vue-router';
import ActivitiesView from '../views/ActivitiesView.vue';

const routes = [
  {
    path: '/',
    name: 'activities',
    component: ActivitiesView,
  },
  {
    path: '/activity/:id',
    name: 'ZoomModal',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "ZoomModal" */ '../components/ZoomModal.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
