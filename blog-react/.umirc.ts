import { defineConfig } from 'umi';
const CompressionPlugin = require("compression-webpack-plugin");
const productionGzipExtensions = /\.(js|css|json|txt|html|ico|svg)(\?.*)?$/i;

export default defineConfig({
  history: {
    type: 'hash'
  },
  publicPath: '/',
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
          title: 'K.P - 技术配毒鸡汤'
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
    {rel: 'icon', href: './static/Ckp.jpg'}
  ],
  dynamicImport: {
    loading: '@/Loading',
  },
  // 开启gzip压缩
  chainWebpack(memo){
    memo.plugin('CompressionPlugin').use(new CompressionPlugin({
      filename: "[path].gz[query]",
      algorithm: "gzip",
      test: productionGzipExtensions,
      // 只处理大于xx字节 的文件，默认：0
      threshold: 10240,
      // 示例：一个1024b大小的文件，压缩后大小为768b，minRatio : 0.75
      minRatio: 0.8, // 默认: 0.8
      // 是否删除源文件，默认: false
      deleteOriginalAssets: false
    }));
  }
});
