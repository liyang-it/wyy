import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import index from '@/page/index'
import user from '@/page/user'
import gdPage from '@/page/gdPage'
import fount from '@/components/fount'
Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [

    {
      path: '/',
      name: 'index',
      component: index,
      meta: {
        title: 'LiYang=MUSIC'
      }
    },
    {
      path: '/user',
      name: 'user',
      component: user
    },
    {
      path: '/helloWorld',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/fount',
      name: 'fount',
      component: fount
    },
    {
      path: '/gdPage',
      name: 'gdPage',
      component: gdPage
    }

  ]
})
