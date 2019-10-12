// import Vue from 'vue'
// import Router from 'vue-router'
import VueRouter from 'vue-router'
// Vue.use(Router);

export default new VueRouter({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: () => import('@/views/index'),
      children: [{
        path: '/index',
        component: () => import('@/views/index'), // 首页
        name: 'index'
      }]
    }
  ]
})
