import Vue from 'vue'
import Router from 'vue-router'
import foot from '@/components/foot/foot'
import found from '@/components/found/found'
import ranking from '@/components/ranking/ranking'
import me from '@/components/me/me'
import foundIndex from '@/components/found/index'
import search from '@/components/found/search'
Vue.use(Router)
export default new Router({
  mode: 'history',
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
            },
            {
              path: '/search',
              name: 'search',
              component: search
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
        }
      ]
    }
  ]
})
