<template>
<div >
<div class="foot_left" :style="{'height': height + 'px','width':width+'px'}">
  <h3>我是左边内容->预备填充区域</h3>
</div>
<div class="foot_right" :style="{'height': height + 'px','width':width+'px'}">
  <h3>我是右边内容->预备填充区域</h3>
</div>
<div id="foot" v-cloak :style="{'height': height + 'px'}">
  <!-- 音乐播放页面-->
  <player v-if="isShowPlayer" :style="{'display': playerStyle}" ></player>
    <!-- 音乐播放 悬浮组件-->
  <player-title v-show="isShowTitle" ></player-title>
  <!--tabbar 底部组件切换 路由 -->
  <div>
    <keep-alive>
      <router-view v-show="isShowRouter"/>
    </keep-alive>
  </div>
    <div>
    <van-tabbar v-model="tabActive" @change="tabChange">
        <van-tabbar-item to="/foundIndex" icon="browsing-history">发现</van-tabbar-item>
        <van-tabbar-item to="/ranking" icon="fire">排行</van-tabbar-item>
        <van-tabbar-item to="/me" icon="manager">我的</van-tabbar-item>
    </van-tabbar>
    </div>
  </div>

</div>
</template>
<script>
/* eslint-disable */
import { Tabbar, TabbarItem, Sticky } from 'vant'
import foot from '@/api/foot.js'
const player = () => import('@/components/player/player')
const playerTitle = () => import('@/components/player/player-title')
export default {
  components: {
    foot,
    'playerTitle': playerTitle,
    'player': player,
    [Tabbar.name]: Tabbar,
    [TabbarItem.name]: TabbarItem,
    [Sticky.name]: Sticky
  },
  name: 'foot',
  data () {
    return {
      tabActive: 0,
      height: document.documentElement.clientHeight,
      width: (document.documentElement.clientWidth - 768) / 2.1
    }
  },
  computed: {
    isShowPlayer () {
      return this.$store.state.is.isShowPlayer
    },
    playerStyle () {
      return this.$store.state.musicStatus.style
    },
    isStart () {
      return this.$store.state.musicStatus.isStart
    },
    isShowRouter () {
      return this.$store.state.is.isShowRouter
    },
    isShowTitle () {
      return this.$store.state.is.isShowTitle
    }
  },
  mounted () {
    let t = this
    window.onresize = () => {
      t.width = (document.documentElement.clientWidth - 768) / 2.1
    }
  },
  methods: {
    tabChange (index) {
      // eslint-disable-next-line no-unused-vars
      this.$store.commit('setIsShowRouter', true)
      this.$store.commit('setPlayerStyle', 'none')
      this.$store.commit('setIsShowTitle', this.$store.state.musicStatus.isStart)
    }
  },
  created () {

  // 访问设备处理
    let thic = this
    // eslint-disable-next-line camelcase
    let device_type = navigator.userAgent// 获取userAgent信息   用户环境信息
    let indexOs = device_type.indexOf('Windows')
    if (indexOs !== -1) {
      thic.$notify({ type: 'warning', message: '您当前访问设备为电脑,建议使用移动端访问有更好的体验', duration: 3000 })
    }
  }
}
</script>
<style >
[v-cloak]{
  display: none;
}
#foot{
  background-color: white;
}
.foot_left{
  text-align: center;
  position: fixed;
  left: 0px;
  height: 100%;
  /* visibility: hidden; */
  display: none;
}
.foot_right{
  position: fixed;
  right: 0px;
  height: 100%;
  display: none;
  text-align: center;
}
/**屏幕宽度大于1500px 像素的时候显示左右两边div内容 */
@media (min-width: 1300px){
.foot_left{
  position: fixed;
  left: 0px;
  height: 100%;
  /* visibility: initial; */
  display: initial;
}
.foot_right{
  position: fixed;
  right: 0px;
  height: 100%;
  /* visibility: initial; */
  display: initial;
}
}
/**屏幕大于768像素的话 把内容居中在屏幕中间 */
  @media (min-width: 768px){

  #foot{
    width: 768px;
    margin:0 auto;
  }

  /** 将vant  的  Sticky 粘性布局组件 超出了设置的屏幕像素后 固定宽度 居中 */
  .van-sticky--fixed {
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    z-index: 99;
    width: 768px;
    margin: auto;
    background: white;
}
/**将 vant的 tab菜单组件 超出了设置的屏幕像素数后 固定宽度居中 */
#foot .van-tabbar {
    z-index: 1;
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
    box-sizing: content-box;
    width: 768px;
    height: 50px;
    padding-bottom: constant(safe-area-inset-bottom);
    padding-bottom: env(safe-area-inset-bottom);
    background-color: #fff;
    right: 0;
    left: 0;
    margin: auto;
}
 .van-grid .gdText{
   font-size: 1.5rem;
 }
#found_head .found_lb{
  height: 400px;
}
#lb{
      height: 400px;
}
#lb  .found_lbText{
  font-size: 3rem;
}
#lb .van-swipe {
    position: relative;
    overflow: hidden;
    cursor: grab;
    -webkit-user-select: none;
    user-select: none;
    height: 400px;
}
#musicTitleDiv_ .musicTitleDiv{
  width: 720px;
}
}
</style>
