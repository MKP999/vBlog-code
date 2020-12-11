import { defineConfig } from 'umi';

export default defineConfig({
  history: {
    type: 'hash'
  },
  publicPath: './',
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [
    { 
      path: '/',
      component: '@/layout/Navbar/index',
      routes: [
        {
          path: '/',
          redirect: '/home'
        },
        {
          path: '/home',
          component: '@/pages/home/index',
          title: '首页'
        },
        {
          path: '/blog',
          component: '@/pages/blog/index',
          title: '博客'
        },
        {
          path: '/production',
          component: '@/pages/production/index',
          title: '作品'
        },
        {
          path: '/message',
          component: '@/pages/message/index',
          title: '留言板'
        },
        {
          path: '/blogroll',
          component: '@/pages/blogroll/index',
          title: '友情链接'
        },
        {
          path: '/timeline',
          component: '@/pages/timeline/index',
          title: '时光轴'
        },
        {
          path: '/joke',
          component: '@/pages/joke/index',
          title: '每日段子'
        },
        {
          path: '/login',
          component: '@/pages/login/index',
          title: '登录'
        },
        {
          path: '/register',
          component: '@/pages/register/index',
          title: '注册'
        }
      ]
    },
  ],
  cssModulesTypescriptLoader: {
    mode: 'emit',
  }
});
