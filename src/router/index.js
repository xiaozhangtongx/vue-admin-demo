import Vue from 'vue'
import VueRouter from 'vue-router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/login',
  },
  {
    path: '/login',
    component: () => import('@/views/login/Login.vue'),
  },
  {
    path: '/main',
    redirect: '/main/home',
    component: () => import('@/layout/BasicLayout.vue'),
    children: [
      {
        path: '/main/home',
        component: () => import('@/views/main/home/Home.vue'),
      },
    ],
  },
  {
    path: '/401',
    component: () => import('@/views/error/401'),
    hidden: true,
  },
  {
    path: '/404',
    component: () => import('@/views/error/404'),
    hidden: true,
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true },
]

const router = new VueRouter({
  base: process.env.BASE_URL,
  routes,
})
// 路由守卫
router.beforeEach((to, from, next) => {
  if (to.path != from.path) {
    NProgress.start()
  }
  next()
})
router.afterEach(() => {
  NProgress.done()
})

export default router
