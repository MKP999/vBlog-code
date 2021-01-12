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
          path: '/blog',
          routes: [
            {
              path: '/blog',
              redirect: '/blog/list'
            },
            {
              path: '/blog/list',
              component: '@/pages/blog/index',
              title: '博客'
            },
            {
                path: '/blog/detail',
                component: '@/pages/detailBlog/index',
                title: '博客详情'
              },
            {
              path: '/blog/edite',
              component: '@/pages/blogEdite/index',
              title: '写博客'
            }
          ]
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
  },
  links: [
    {rel: 'icon', href: './static/Ckp.png'}
  ]
});
