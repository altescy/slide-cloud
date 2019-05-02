import Vue from 'vue';
import Router from 'vue-router';
import Edit from '@/views/Edit.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '*',
      name: 'edit',
      component: Edit,
    },
  ],
});
