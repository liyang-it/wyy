
<template>
<div >
  <div class="musicBody" :style="{'height': height+ 'px'}" ></div>
      <div class="headMusic">
        <div style="margin-left: 10px; margin-top: 10px;"><van-icon name="arrow-down" size="30" @click="backGd"/></div>
          <h3 class="h3">{{music.title}}</h3><h4 class="h4">{{music.artist}}</h4>
      </div>
      <div style="position: absolute;width: 100%;top: 20%;" >
        <div  class="musicConten">
      <van-image
          @click="playMusic"
          round
          width="100%"
          height="100%"
          :src="music.pic"
      />
      </div>
      </div>
      <div class="musicFoot">
        <div style="margin: 0 auto;width: 95%;">
         <aplayer autoplay :style="{'width': width + 'px'}" v-if="showPlay"
          :music="music"
          />
        </div>
      </div>
  </div>
</template>
<script>
import Aplayer from 'vue-aplayer'
import { Popup, Toast, Search, Circle, Sticky, Col, Row, Image as VanImage, Swipe, SwipeItem, Button, PullRefresh, Grid, GridItem, Tabbar, TabbarItem, Icon, List, Loading, Cell, CellGroup } from 'vant'
export default {

  /** 注册组件 */
  components: {
    Aplayer,
    [Popup.name]: Popup,
    [Toast.name]: Toast,
    [Sticky.name]: Sticky,
    [Search.name]: Search,
    [Col.name]: Col,
    [Row.name]: Row,
    [VanImage.name]: VanImage,
    [Circle.name]: Circle,
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem,
    [Button.name]: Button,
    [PullRefresh.name]: PullRefresh,
    [Grid.name]: Grid,
    [GridItem.name]: GridItem,
    [Tabbar.name]: Tabbar,
    [TabbarItem.name]: TabbarItem,
    [Icon.name]: Icon,
    [List.name]: List,
    [Loading.name]: Loading,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup
  },
  props: {
    music1: {
      type: Object,
      default: null
    },
    url: {
      type: String,
      default: null
    },
    showPlay: {
      type: Boolean,
      default: false
    }
  },
  name: 'playMusic',
  data () {
    return {
      height: document.documentElement.clientHeight - 50, // 播放页面界面高度与屏幕一样
      width: document.documentElement.clientWidth - 30
    }
  },
  computed: {
    music () {
      return this.$store.state.music
    }

  },
  watch: {
    music1: function (n, old) {
      console.error(n)
    },
    music: function (n, old) {
      console.error(n)
    }
  },
  methods: {
    backGd () {
      console.log('返回')
      this.$emit('backGd')
    },
    playMusic () {
      // this.$refs.audio.play()
      console.log(this.$refs.audio.pause())
    }
  },
  created () {
    this.name = localStorage.getItem('name')
    console.log(localStorage.getItem('name'))
  }
}
</script>
<style >
  .headMusic{
    position: absolute;
    top: -10px;
    width: 100%;
    color: white;
    margin-top: 10px;
  }
  .h3{
    text-align: center;
    margin-top: -35px;
  }
  .h4{
    text-align: center;
    margin-top: -18px;
  }
  .musicBody{
    margin-top: -10px;
background: #654ea3;  /* fallback for old browsers */
background: -webkit-linear-gradient(to right, #eaafc8, #654ea3);  /* Chrome 10-25, Safari 5.1-6 */
background: linear-gradient(to right, #eaafc8, #654ea3); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

  }
  .musicConten{
    width: 250px;
    height: 250px;
    margin: 0 auto;
  }
</style>
