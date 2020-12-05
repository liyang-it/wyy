<template>
<div id="player" class="player" >
  <div class="musicBody" :style="{'height': height + 'px','background-image': 'url('+music.pic+')'}"></div>
      <div class="headMusic">
        <div style="margin-left: 10px; margin-top: 10px;"><van-icon name="arrow-down" size="30" @click="backGd"/></div>
        <div>
          <h3 class="h3">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{music.title}} - {{music.artist}}</h3>
          <!-- <h4 class="h4"></h4> -->
        </div>
      </div>
    <div class="contentImg" >
        <div  class="musicConten" :style="{'height': pmHeight}">
          <van-image class="xz" width="100%" height="100%" :src="music.pic"/>
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
/* eslint-disable */
import {Notify, Slider, Popup, Toast, Search, Circle, Sticky, Col, Row, Image as VanImage, Swipe, SwipeItem, Button, PullRefresh, Grid, GridItem, Tabbar, TabbarItem, Icon, List, Cell, CellGroup, Progress, CountDown } from 'vant'
import axios from 'axios'
import api from '@/api/api.js'
import playerApi from '@/api/playerApi.js'
import http from '@/api/http.js'

export default {
  /** 注册组件 */
  components: {
    http,
    api: api,
    playerApi,
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
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [Progress.name]: Progress,
    [CountDown.name]: CountDown,
    [Slider.name]: Slider,
    [Notify.name]: Notify
  },
  name: 'playMusic',
  data () {
    return {
      height_: document.documentElement.clientHeight - 30,
      name: null,
      playIcon: 'play-circle',
      playIcons: ['play-circle', 'pause-circle'],
      musicMaxTime: null
    }
  },
  computed: {
    music () {
      return this.$store.state.music
    },
    pmHeight () {
      let height = document.documentElement.clientWidth * 0.75
      return height
    },
    height () {
      return this.height_
    }
  },
  mounted () {
    let t = this
      window.onresize = function(){
        let clientHeight = document.documentElement.clientHeight - 30
        t.height_ = clientHeight
    }
  },
  watch: {

  },
  methods: {
    // 音乐进度
    dragend (value) {
      this.$refs.audio.currentTime = value
    },
    down () {
      let downUrl = this.$refs.audio.src // 音乐地址
      let fileName = playerApi.downFileName // 文件名设置
      axios({
        method: 'get',
        url: downUrl,
        responseType: 'blob',
        headers: {'content-type': 'audio/mpeg'}
        // headers: {'content-length': '4066786', 'content-type': 'audio/mpeg'}
      }).then((res) => {
        let blobType = 'application/force-download'
        let blob = new Blob([res.data], {type: res.data.type}) // 创建blob 设置blob文件类型 data 设置为后端返回的文件 type:这里设置后端返回的类型 为 mp3
        let downa = document.createElement('a') // 创建A标签
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
    // 按钮播放
    play () {
      let isStart = this.$store.state.musicStatus.isStart
      if (isStart === true) {
        let isPaused = this.$refs.audio.paused // 是否暂停状态
        if (isPaused === true) {
          this.$refs.audio.play()
          this.playIcon = this.playIcons[1]
        } else {
          this.$refs.audio.pause()
          this.playIcon = this.playIcons[0]
        }
      } else {
        Notify({ type: 'danger', message: '音乐加载失败' })
      }
    },
    wbPlay () {
      // 外部调用 
      let isStop = this.$store.state.musicStatus.isStop
      this.$refs.audio.pause()
      this.playIcon = this.playIcons[0]
    },
    backGd () {
      playerApi.showGd()
    },
    // 播放结束
    ended () {
      this.playIcon = this.playIcons[0]
      this.play()
    },
    // audio 加载完毕
    loadeddata () {
      this.playIcon = 'pause-circle'
      // 音乐总长度(单位:秒)
      this.musicMaxTime = Math.floor(this.$refs.audio.duration)
      // 计算出 音乐分钟
      let time = playerApi.getMusicRunTime(this.musicMaxTime)
      this.$store.commit('setMaxJdt', this.musicMaxTime)
      this.$store.commit('setIsStart', true)
      this.$store.commit('setIsStop', true)
      this.$store.commit('setStopTime', time)
    },
    // audio播放中
    timeupdate () {

      let isStop = this.$store.state.musicStatus.isStop
      if (isStop === false) {
        // 说明外部已经暂停音乐
        this.wbPlay()
      }
      // 音乐当前长度(单位:秒)
      let musicTime = Math.floor(this.$refs.audio.currentTime)
      let time = playerApi.getMusicRunTime(musicTime)
      this.$store.commit('setJdt', musicTime)
      this.$store.commit('setStartTime', time)
      this.$store.commit('setIsStop', true)
    },
    // audio加载失败
    error () {
      Notify({ type: 'danger', message: '音乐加载失败' })
      this.playIcon = 'play-circle'
    }
  }
}
</script>
<style >
.player{
  background-size: cover;
}

  .headMusic{
    top: -10px;
    width: 100%;
    color: white;
    margin-top: 10px;
    position: absolute;
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
    background-size: cover;
    margin-top: -10px;
    filter: blur(6px);
  }
  .musicConten{
    width: 75%;
    margin: 0 auto;
  }
  .contentImg{
    width: 100%;
    top: 10%;
    position: absolute;
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
  .btns {
    width: 98%;
    height: 100px;
    bottom: 12%;
    position: absolute;
  }
  .xz{
    border-radius: 10%;
    overflow: auto;
  }
  @media (min-width: 768px){
  .headMusic{
    top: -10px;
    width: 768px;
    color: white;
    margin-top: 10px;
    position: absolute;
  }
  .btns {
    width: 768px;
    height: 100px;
    bottom: 12%;
    position: absolute;
    }
  .contentImg{
    width: 768px;
    top: 10%;
    position: absolute;
  }
  }
</style>
