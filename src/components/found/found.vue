<template>
<div id="app">
<div >
  <van-sticky :offset-top="0">
      <div v-show="showQuery"><van-search :placeholder="Placeholder" @click="search"/></div>
      <div class="playImg" v-if="isStart" :style="{'display': musicIconStyle}">
        <van-image class="xz"
          @click="clickIconShowPlay"
          round
          width="2.5rem"
          height="2.5rem"
          fit="cover"
          :src="$store.state.music.pic"
        />
      </div>
  </van-sticky>
</div>
<!--歌单详情-->
<div  v-show="isShowGd" >
   <div style="position: absolute;top: 10px;left: 20px;"><van-icon name="arrow-left" color="white" size="30" @click="backFount"/></div>
   <div style="position: absolute;top: 180px;left: 10px;color: white;"><span>{{gdSx.name}}</span><br><span>--     {{gdSx.copywriter}}</span></div>
        <img :src="gdSx.picUrl" style="width: 100%;height:375px;margin-top: -60px;">
        <div style="margin-top: -50px;">
          <van-cell v-for="(gq, i) in gqList" :key="gq.index" :label="gq.artist+' - '+gq.alName" >
            <template #title >
             <div @click="startMusic(gq)"><font style="color: tan;font-size: 1.2rem;">{{i + 1}}</font><font style="margin-left: 10px;font-size: 1.0rem;">{{gq.title}}</font></div>
            </template>
            <template #right-icon>
                <van-icon name="bars" class="more" size="26" @click="songde(gq)"/>
            </template>
          </van-cell>
        </div>
        <div style="width: 150px;margin: 0 auto;margin-bottom: 130px;" v-if="isShowGqText"> <a @click="loadGq" style="color:red;text-decoration-line: underline;">{{loadGqText}}</a> </div>
  <!-- songde 歌曲详情按钮-->
  <van-popup v-model="showSongde" round position="bottom" :style="{ height: '65%' }" >
  </van-popup>
</div>
<!-- 播放歌曲-->
<!--<play-music :music1="music1" :url="url" :showPlay="showPlay" v-show="showMusicPlay" @backGd="backGd"></play-music>-->
  <!--轮播图片-->
 <div v-show="showFount">
 <van-sticky :offset-top="53" class="head">
  <div style="width: 90%;margin: -10px auto;height: 200px;    box-shadow: 0px 0px 20px 3px;margin-top:10px;" id="lb">
  <van-swipe  :autoplay="3000"  @change="changeLbImg" :height="200" >
    <van-swipe-item v-for="value in lbList" :key="value.index">
      <img :src="value" alt="" class="lbImg"></van-swipe-item>
    <template #indicator>
    <div class="custom-indicator">
      {{ current + 1 }}/{{lbList.length}}
    </div>
  </template>
  </van-swipe>
  </div>
  <h3 style="color: black;margin: 10px 15px;">每日歌单推荐</h3>
  </van-sticky>
  <!-- 歌单-->
  <div class="gd" style="margin-bottom: 130px;    margin-top: 10px;">
    <div>
      <van-grid :column-num="columnGd" >
        <van-grid-item v-for="gd in gdList" :key="gd.index" class="xf" @click="toGdPage(gd)">
          <div >
          <van-image  :src="gd.picurl" />
          <p class="bfl"><van-icon name="service-o" size="15"></van-icon> {{ gd.playcount}}万</p>
          <div style="height: 36px;"><span  class="gdText">{{ gd.name}}</span></div>
          </div>

        </van-grid-item>
      </van-grid>
    </div>
     <div style="width: 150px;margin: 0 auto;" > <a @click="loadGd" style="color:red;text-decoration-line: underline;">{{loadGdText}}</a> </div>
  </div>
</div>
</div>
</template>
<script>

/** 局部引入vant 组件 */
// eslint-disable-next-line no-unused-vars
import { Popup, Toast, Search, Circle, Sticky, Col, Row, Image as VanImage, Swipe, SwipeItem, Button, PullRefresh, Grid, GridItem, Tabbar, TabbarItem, Notify, Icon, List, Loading, Cell, CellGroup } from 'vant'
// 引入自定义组件
import Aplayer from 'vue-aplayer'
import axios from 'axios'
import playerApi from '@/api/playerApi.js'
// import playMusic from '@/components/playMusic'
export default {
  /** 注册组件 */
  components: {
    playerApi,
    Aplayer,
    // 'play-music': playMusic,
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
  name: 'index',
  data () {
    return {
      isShowGqText: false,
      isShowGdText: false,
      loadGqText: '加载更多歌曲...',
      isLoadGd: true,
      isLoadGq: true,
      loadGdText: '加载更多歌单...',
      songs: [],
      url: null,
      music: {},
      gqLimit: 50,
      gqPage: 1,
      showSongde: false,
      gqList: [],
      Placeholder: '起风了- 买辣椒也要卷',
      phone: '15575141967',
      pass: 'liyang664243',
      currentRate: 10,
      current: 0,
      columnGd: 3,
      gdList: [],
      gdLimit: 27,
      gdPage: 1,
      lbList: [],
      gdSx: {
        id: null,
        name: null,
        copywriter: null,
        picUrl: null
      }
    }
  },
  watch: {
  },
  methods: {
    search () {
      this.$router.push({path: 'search'})
    },
    clickIconShowPlay () {
      this.$store.commit('setIsShowFound', false)
      playerApi.showPlay()
    },
    changeLbImg (index) {
      this.current = index
    },
    toGdPage (gd) {
      this.$store.commit('setIsSwitch', false)
      //  加载
      // eslint-disable-next-line no-unused-vars
      let loding = Toast.loading({
        duration: 0,
        message: '加载中...',
        forbidClick: true,
        loadingType: 'spinner',
        // eslint-disable-next-line no-dupe-keys
        forbidClick: true
      })
      this.$store.commit('setIsShowFound', false)
      this.$store.commit('showGd')
      this.gdSx.id = gd.id
      this.gdSx.name = gd.name
      this.gdSx.copywriter = gd.copywriter
      this.gdSx.picUrl = gd.picurl
      // 根据歌单ID 获取歌曲列表
      axios.get('http://47.99.165.122/liyang/music/getMusicAllByGdidNotUrl.json', {params: { id: gd.id, page: this.gqPage, limit: this.gqLimit }}).then((res) => {
        this.gqList = res.data.data
        loding.clear()
        this.isShowGqText = true
        // eslint-disable-next-line no-unused-vars
        let t = document.body.clientHeight // 获取页面最大高度 window.scroll({ top: t, left: 0, behavior: 'smooth' }) 滚动到页面最底部
        window.scroll({ top: 0, left: 0, behavior: 'smooth' }) // 滚动到页面最顶部
      })
    },
    backFount () {
      console.log('返回')
      this.$store.commit('setIsShowFound', true)
      this.$store.commit('setIsShowStartImg', true)
      this.$store.commit('hideGd')
    },
    songde (gq) {
      this.showSongde = true
    },
    startMusic (gq) {
      // eslint-disable-next-line no-unused-vars
      let geMusicUrl = 'https://musicapi.leanapp.cn/music/url?id=' + gq.id
      axios.get(geMusicUrl).then((res) => {
        gq.src = res.data.data[0].url
        if (gq.src === null) {
          Toast.fail('该音乐已被网易云设置收费')
        }
        // eslint-disable-next-line no-unused-vars
        // 判断是否正在播放 如果正在播放 不需要重新设置音乐
        // eslint-disable-next-line no-unused-vars
        document.title = gq.title
        let isStart = this.$store.state.musicStatus.isStart
        if (isStart === false) {
          this.$store.commit('setMusic', gq)
        } else {
          // 判断 播放是否为同一首歌曲 如果是 继续播放 不用重置音乐
          // eslint-disable-next-line no-unused-vars
          // eslint-disable-next-line no-use-before-define
          let gqid = this.$store.state.music.id
          if (gqid !== gq.id) {
            this.$store.commit('setMusic', gq)
            // this.$store.commit('setPlayerStyle', '')
          } else {
            // this.$store.commit('setPlayerStyle', '')
          }
        }
        console.log(this.musicIconStyle)
        playerApi.showPlay()
        // eslint-disable-next-line no-unused-vars
        let t = document.body.clientHeight // 获取页面最大高度 window.scroll({ top: t, left: 0, behavior: 'smooth' }) 滚动到页面最底部
        window.scroll({ top: 0, left: 0, behavior: 'smooth' }) // 滚动到页面最顶部
      })
    },
    loadGd () {
      // eslint-disable-next-line no-unused-vars
      if (this.isLoadGd === false) {
        return
      }
      let loding = Toast.loading({
        duration: 0,
        message: '加载歌单...',
        forbidClick: true,
        loadingType: 'spinner',
        // eslint-disable-next-line no-dupe-keys
        forbidClick: true
      })
      this.gdPage = this.gdPage + 1
      axios.get('http://47.99.165.122/liyang/music/getPlayList.json', {params: {page: this.gdPage, limit: this.gdLimit}}).then((res) => {
        if (res.data.data.length === 0) {
          this.isLoadGd = false
          this.loadGdText = '已经到最底下了喔'
          loding.clear()
        } else {
          for (let i = 0; i < res.data.data.length; i++) {
            this.gdList.push(res.data.data[i])
            loding.clear()
          }
        }
      })
    },
    loadGq () {
      // eslint-disable-next-line no-unused-vars
      let loding = Toast.loading({
        duration: 0,
        message: '加载歌曲...',
        forbidClick: true,
        loadingType: 'spinner',
        // eslint-disable-next-line no-dupe-keys
        forbidClick: true
      })
      this.gqPage = this.gqPage + 1
      axios.get('http://47.99.165.122/liyang/music/getMusicAllByGdidNotUrl.json', {params: { id: this.gdSx.id, page: this.gqPage, limit: this.gqLimit }}).then((res) => {
        if (res.data.data.length === 0) {
          this.isLoadGq = false
          this.loadGqText = '已经到最底下了喔'
          loding.clear()
        } else {
          for (let i = 0; i < res.data.data.length; i++) {
            this.gqList.push(res.data.data[i])
            loding.clear()
          }
        }
      })
    }
  },
  computed: {
    isShowGd () {
      return this.$store.state.is.isShowGd
    },
    isStart () {
      return this.$store.state.musicStatus.isStart
    },
    musicIconStyle () {
      return this.$store.state.musicStatus.musicIconStyle
    },
    showQuery () {
      return this.$store.state.is.isShowQuery
    },
    showFount () {
      return this.$store.state.is.isShowFound
    },
    showStartImg () {
      return this.$store.state.is.isShowStartImg
    }

  },
  created () {
    // eslint-disable-next-line no-unused-vars
    let thic = this
    // eslint-disable-next-line no-unused-vars
    let count = 10
    axios.get('http://47.99.165.122/liyang/music/getPlayList.json', {params: {page: this.gdPage, limit: this.gdLimit}}).then((res) => {
      thic.gdList = res.data.data
      for (let i = 0; i < count; i++) {
        thic.lbList[i] = thic.gdList[i].picurl
      }
    })
  }
}
</script>
<style>
.custom-indicator {
    position: absolute;
    right: 5px;
    bottom: 5px;
    padding: 2px 5px;
    font-size: 12px;
    background: rgba(0, 0, 0, 0.1);
    color: red;
  }
.head {
  width: 100%;
  color: white;
  margin-top: -10px;
}
.van-sticky{
  background-color: white;
}
.playImg{
    position: absolute;
    top: 10px;
    right: 0px;
    width: 5rem;
    background: #283c86;  /* fallback for old browsers */
    background: -webkit-linear-gradient(to right, #45a247, #283c86);  /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(to right, #45a247, #283c86); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
    border-radius: 20px 0px 0px 20px;
    height: 2.5rem;

}
.xz {
    /**
    -webkit-transition-property: -webkit-transform;
    -webkit-transition-duration: 1s;
    -moz-transition-property: -moz-transform;
    -moz-transition-duration: 1s;
    -webkit-animation: rotate 3s linear infinite;
    -moz-animation: rotate 3s linear infinite;
    -o-animation: rotate 3s linear infinite;
     */
    animation: rotate 30s linear infinite;

}

@-webkit-keyframes rotate{from{-webkit-transform: rotate(0deg)}
    to{-webkit-transform: rotate(360deg)}
}
@-moz-keyframes rotate{from{-moz-transform: rotate(0deg)}
    to{-moz-transform: rotate(359deg)}
}
@-o-keyframes rotate{from{-o-transform: rotate(0deg)}
    to{-o-transform: rotate(359deg)}
}
@keyframes rotate{from{transform: rotate(0deg)}
    to{transform: rotate(359deg)}
}
.lbImg{
  height: 100%;
  width: 100%;
}
.van-swipe__indicator--active{
  background-color: red;
}
.bfl{
    color: white;
    top: 10px;
    right: 15px;
    position: absolute;
    font-size: 13px;
}
.xf :hover .gdText{
  color: red;

}
.gdText{
    font-size: 0.8rem;
    font-weight: 600;
}
.musicFoot{
    position: fixed;
    bottom: 50px;
    width: 100%;
    z-index: 2020;
}
</style>
