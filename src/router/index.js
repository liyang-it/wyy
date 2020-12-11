import Vue from 'vue'
import Router from 'vue-router'
const foot = () => import('@/components/foot/foot')
const found = () => import('@/components/found/found')
const ranking = () => import('@/components/ranking/ranking')
const me = () => import('@/components/me/me')
const foundIndex = () => import('@/components/found/index')
const search = () => import('@/components/found/search')
const test = () => import('@/components/test')
const mv = () => import('@/components/other/mv')
const geshou = () => import('@/components/other/geshou')
const pl = () => import('@/components/other/pl')
const video = () => import('@/components/other/video')
const gedan = () => import('@/components/other/gedan')
const down = () => import('@/components/other/down')
const searchResult = () => import('@/components/found/search-result')
// const xz = () => import('@/components/other/xz')
Vue.use(Router)
export default new Router({
  mode: 'hash', // 路由模式
  base: '/wyy/',
  scrollBehavior (to, from, savedPosition) {
    // 解决路由跳转后 会滚动到底部
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  },
  routes: [
    {
      path: '/',
      // 配置項目啟動重定向到 found頁面
      redirect: 'found'
    },
    {
      path: '/test',
      name: 'test',
      component: test
    },
    {
      path: '/foot',
      name: 'foot',
      component: foot,
      children: [
        {
          path: '/foundIndex',
          name: 'foundIndex',
          component: foundIndex,
          // 配置found 主页面默认显示 found页面
          redirect: '/found',
          children: [
            {
              path: '/found',
              name: 'found',
              component: found
            }
          ]
        },
        {
          path: '/ranking',
          name: 'ranking',
          component: ranking
        },
        {
          path: '/me',
          name: 'me',
          component: me
        },
        {
          path: '/search',
          name: 'search',
          component: search
        },
        {
          path: '/mv/:music',
          name: 'mv',
          component: mv
        },
        {
          path: '/geshou/:id',
          name: 'geshou',
          component: geshou
        },
        {
          path: '/pl/:id',
          name: 'pl',
          component: pl
        },
        {
          path: '/searchResult/:value',
          name: 'searchResult',
          component: searchResult
        },
        {
          path: '/video/:id',
          name: 'video',
          component: video
        },
        {
          path: '/gedan/:id',
          name: 'gedan',
          component: gedan
        },
        {
          path: '/down',
          name: 'down',
          component: down
        }
      ]
    }
  ]
})
