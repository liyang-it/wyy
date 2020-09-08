<template>
<div id="foot">
  <player v-if="isShowPlayer" :style="{'display': playerStyle}"></player>
  <div><router-view/></div>
    <div>
    <van-tabbar v-model="tabActive" @change="tabChange">
        <van-tabbar-item to="/foundIndex" icon="browsing-history">发现</van-tabbar-item>
        <van-tabbar-item to="/ranking" icon="fire">排行</van-tabbar-item>
        <van-tabbar-item to="/me" icon="manager">我的</van-tabbar-item>
    </van-tabbar>
    </div>
</div>
</template>
<script>
import { Tabbar, TabbarItem } from 'vant'
import player from '@/components/player/player'
import foot from '@/api/foot.js'
export default {
  components: {
    foot,
    'player': player,
    [Tabbar.name]: Tabbar,
    [TabbarItem.name]: TabbarItem
  },
  name: 'foot',
  data () {
    return {
      tabActive: 0
    }
  },
  computed: {
    isShowPlayer () {
      return this.$store.state.is.isShowPlayer
    },
    playerStyle () {
      return this.$store.state.musicStatus.style
    }
  },
  methods: {
    tabChange (index) {
      // eslint-disable-next-line no-unused-vars
      // 如果直接切换排行页面或者 我的页面  > 从播放页面直接返回到found页面 不显示歌单
      switch (index) {
        case 0:
          foot.switch1()
          break
        case 1:
          foot.switch2()
          break
        case 2:
          foot.switch2()
          break
      }
    }
  }
}
</script>
<style >
</style>
