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
    hideInMenu: true,
    path: '/login',
    component: () => import('@/views/login/Login.vue'),
  },
  {
    path: '/main',
    redirect: '/main/home',
    name: 'Main',
    meta: { authority: ['user', 'admin'] },
    component: () => import('@/layout/BasicLayout.vue'),
    children: [
      {
        path: '/main/home',
        name: 'Home',
        meta: { icon: 'home', title: '系统首页', authority: ['admin', 'user'] },
        component: () => import('@/views/main/home/Home.vue'),
      },
      // 用户管理页面
      {
        path: '/main/users',
        meta: {
          icon: 'team',
          title: '用户管理',
          authority: ['admin'],
        },
        name: 'Users',
        component: () => import('@/views/main/home/Home.vue'),
      },
      // 管理员文章管理页面
      {
        path: '/main/aarticles',
        meta: {
          icon: 'read',
          title: '文章管理',
          authority: ['admin'],
        },
        name: 'Aarticles',
        component: () => import('@/views/main/home/Home.vue'),
      },
      // 用户文章详细信息页面
      {
        path: '/main/articles',
        hideInMenu: true,
        component: () => import('@/views/main/home/Home.vue'),
      },
      // 用户个人文章管理页面
      {
        path: '/main/uarticles',
        meta: {
          icon: 'read',
          title: '文章管理',
          authority: ['user'],
        },
        name: 'Uarticles',
        component: () => import('@/views/main/home/Home.vue'),
      },
      // 个人中心页面
      {
        path: '/main/account',
        meta: {
          icon: 'user',
          title: '个人中心',
          authority: ['user', 'admin'],
        },
        name: 'Accounts',
        component: () => import('@/views/main/home/Home.vue'),
      },
    ],
  },
  {
    path: '/401',
    component: () => import('@/views/error/401'),
    hideInMenu: true,
  },
  {
    path: '/404',
    component: () => import('@/views/error/404'),
    hideInMenu: true,
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true },
]

const router = new VueRouter({
  base: process.env.BASE_URL,
  routes,
})

const VueRouterPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(to) {
  return VueRouterPush.call(this, to).catch((err) => err)
}

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
