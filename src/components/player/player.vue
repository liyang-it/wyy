<template>
  <div id="player">
  <div class="musicBody" :style="{'height': height+ 'px'}" ></div>
      <div class="headMusic">
        <div style="margin-left: 10px; margin-top: 10px;"><van-icon name="arrow-down" size="30" @click="backGd"/></div>
          <h3 class="h3">{{music.title}}</h3><h4 class="h4">{{music.artist}}</h4>
      </div>
      <div style="position: absolute;width: 100%;top: 20%;" >
        <div  class="musicConten">
      <van-image
          class="xz"
          @click="playMusic"
          round
          width="100%"
          height="100%"
          :src="music.pic"
      />
      <audio :src="music.src" ref="audio"  @ended="ended" @loadeddata="loadeddata" @timeupdate="timeupdate" @error="error" autoplay></audio>
      </div>
      </div>
    <div class="btns">
      <table >
        <tr style="height: 40px;">
          <td style="width: 60px;text-align: left;" ><font>{{$store.state.musicStatus.startTime}}</font></td>
          <td><van-slider v-model="$store.state.musicStatus.jdt" bar-height="4px" active-color="#ee0a24" :max="$store.state.musicStatus.maxPlayTime" @change="dragend"/></td>
          <td style="width: 55px;text-align: right;"><font>{{$store.state.musicStatus.stopTime}}</font></td>
        </tr>
        <tr>
          <td><van-icon name="exchange" size="30" color="white"/></td> <!--pause-circle-->
          <td><van-icon :name="playIcon" size="35" @click="play" color="white" /></td>
          <td><van-icon name="down"  size="30" @click="down" color="white"/></td>
          <td></td>
        </tr>
      </table>
      </div>
  </div>
</template>
<script>
import Aplayer from 'vue-aplayer'
// eslint-disable-next-line no-unused-vars
import axios from 'axios'
import api from '@/api/api.js'
import playerApi from '@/api/playerApi.js'
import http from '@/api/http.js'
import { Slider, Popup, Toast, Search, Circle, Sticky, Col, Row, Image as VanImage, Swipe, SwipeItem, Button, PullRefresh, Grid, GridItem, Tabbar, TabbarItem, Icon, List, Loading, Cell, CellGroup, Progress, CountDown } from 'vant'
export default {

  /** 注册组件 */
  components: {
    http,
    api: api,
    playerApi,
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
    [CellGroup.name]: CellGroup,
    [Progress.name]: Progress,
    [CountDown.name]: CountDown,
    [Slider.name]: Slider
  },
  name: 'playMusic',
  data () {
    return {
      height: document.documentElement.clientHeight - 50, // 播放页面界面高度与屏幕一样
      width: document.documentElement.clientWidth - 30,
      name: null,
      playIcon: 'play-circle',
      playIcons: ['play-circle', 'pause-circle'],
      musicMaxTime: null
    }
  },
  computed: {
    music () {
      return this.$store.state.music
    }
  },
  watch: {
  },
  methods: {
    dragend (value) {
      this.$refs.audio.currentTime = value
    },
    down () {
      // eslint-disable-next-line no-unused-vars
      let downUrl = this.$refs.audio.src // 音乐地址
      // eslint-disable-next-line no-unused-vars
      let fileName = playerApi.downFileName // 文件名设置
      // eslint-disable-next-line no-unused-vars
      axios({
        method: 'get',
        url: downUrl,
        responseType: 'blob',
        headers: {'content-type': 'audio/mpeg'}
        // headers: {'content-length': '4066786', 'content-type': 'audio/mpeg'}
      }).then((res) => {
        console.log(res)
        // eslint-disable-next-line no-unused-vars
        let blobType = 'application/force-download'
        // eslint-disable-next-line no-unused-vars
        let blob = new Blob([res.data], {type: res.data.type}) // 创建blob 设置blob文件类型 data 设置为后端返回的文件 type:这里设置后端返回的类型 为 mp3
        let downa = document.createElement('a') // 创建A标签
        // eslint-disable-next-line no-unused-vars
        let href = window.URL.createObjectURL(blob) // 创建下载的链接
        downa.href = href // 下载地址
        downa.download = fileName // 下载文件名
        document.body.appendChild(downa)
        downa.click() // 点击
        document.body.removeChild(downa) // 下载完成移除元素
        window.URL.revokeObjectURL(href) // 释放blob对象
      }).catch(function (error) {
        console.log(error)
      })
    },
    play () {
      // eslint-disable-next-line no-unused-vars
      let isStart = this.$store.state.musicStatus.isStart
      if (isStart === true) {
        // eslint-disable-next-line no-unused-vars
        let isPaused = this.$refs.audio.paused // 是否暂停状态
        if (isPaused === true) {
          this.$refs.audio.play()
          this.playIcon = this.playIcons[1]
        } else {
          this.$refs.audio.pause()
          this.playIcon = this.playIcons[0]
        }
      } else {
        Toast.fail('音乐加载失败')
      }
    },
    backGd () {
      /**
       * 如果是排行页面或者我的页面切换过来 不需要显示歌单，直接显示 found
       */
      // eslint-disable-next-line no-unused-vars
      let isSwitch = this.$store.state.is.isSwitch
      if (isSwitch === true) {
        console.log('返回不显示歌单')
        this.$store.commit('setIsShowFound', true)
        this.$store.commit('setIsShowStartImg', true)
        this.$store.commit('setPlayerStyle', 'none')
        this.$store.commit('setMusicIconStyle', '')
      } else {
        playerApi.showGd()
      }
    },
    playMusic () {
    },
    ended () {
      console.log('播放结束')
      this.playIcon = this.playIcons[0]
    },
    loadeddata () {
      this.playIcon = 'pause-circle'
      // 音乐总长度(单位:秒)
      this.musicMaxTime = Math.floor(this.$refs.audio.duration)
      // 音乐分钟
      // eslint-disable-next-line no-unused-vars
      let time = playerApi.getMusicRunTime(this.musicMaxTime)
      this.$store.commit('setMaxJdt', this.musicMaxTime)
      this.$store.commit('setIsStart', true)
      this.$store.commit('setStopTime', time)
    },
    timeupdate () {
      // 音乐当前长度(单位:秒)
      let musicTime = Math.floor(this.$refs.audio.currentTime)
      // eslint-disable-next-line no-unused-vars
      let time = playerApi.getMusicRunTime(musicTime)
      this.$store.commit('setJdt', musicTime)
      this.$store.commit('setStartTime', time)
    },
    error () {
      Toast.fail('音乐加载失败')
      this.playIcon = 'play-circle'
    }
  }
}
</script>
<style >
#player{
  height: 250px;
  width: 100%;
  background-color: red;
}
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
  .btns {
    width: 98%;
    height: 100px;
    position: absolute;
    bottom: 12%;

  }
    .btns font{
    color: white;
  }
  .btns table{
    width: 90%;
    margin: 0 auto;
    text-align: center;
  }
  .van-slider__button {
    width: 12px;
    height: 12px;
}
</style>
