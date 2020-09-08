<template>
<div id="app">
  <!-- 头部  搜索款和播放按键-->
        <div class="musicFoot" v-show="showMusicPlay">
        <div style="margin: 0 auto;width: 95%;">
         <aplayer ref="aplayer" v-if="showPlay" @pause="zt" @canplay="canplay"
          :music="music"
          />
        </div>
      </div>
<div >
  <van-sticky :offset-top="0">
      <div v-show="showQuery"><van-search :placeholder="Placeholder" /></div>
      <div class="playImg" v-show="showStartImg"><van-image
          round
          width="2.5rem"
          height="2.5rem"
          fit="cover"
          src="http://p2.music.126.net/FIVmkvivebTRQupzNoX4yA==/109951165232987603.jpg"
        />
      </div>
  </van-sticky>
</div>
<!--歌单详情-->
<div  v-show="showGd" >
   <div style="position: absolute;top: 10px;left: 20px;"><van-icon name="arrow-left" color="white" size="30" @click="backFount"/></div>
   <div style="position: absolute;top: 180px;left: 10px;color: white;"><span>{{gdSx.name}}</span><br><span>--     {{gdSx.copywriter}}</span></div>
        <img :src="gdSx.picUrl" style="width: 100%;height:375px;">
        <div style="margin-top: -80px;">
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
  <div style="width: 90%;margin: auto;height: 200px;    box-shadow: 0px 0px 20px 3px pink;margin-top:10px;" id="lb">
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
<!-- foot -->
<div id="foot">
    <van-tabbar v-model="tabActive" @change="tabChange">
        <van-tabbar-item icon="browsing-history">发现</van-tabbar-item>
        <van-tabbar-item icon="fire">排行</van-tabbar-item>
        <van-tabbar-item icon="manager">我的</van-tabbar-item>
    </van-tabbar>
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
// import playMusic from '@/components/playMusic'
export default {
  /** 注册组件 */
  components: {
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
      isFirstPlay: false,
      isShowGqText: false,
      isShowGdText: false,
      loadGqText: '加载更多歌曲...',
      isLoadGd: true,
      isLoadGq: true,
      loadGdText: '加载更多歌单...',
      songs: [],
      showPlay: false,
      url: null,
      showMusicPlay: true,
      music: {},
      gqLimit: 50,
      gqPage: 1,
      showStartImg: true,
      showSongde: false,
      gqList: [],
      showQuery: true,
      tabActive: 0,
      Placeholder: '起风了- 买辣椒也要卷',
      showFount: true,
      showRanking: false,
      showUser: false,
      phone: '15575141967',
      pass: 'liyang664243',
      currentRate: 10,
      current: 0,
      columnGd: 3,
      gdList: [],
      gdLimit: 27,
      gdPage: 1,
      lbList: [],
      showGd: false,
      gdSx: {
        id: null,
        name: null,
        copywriter: null,
        picUrl: null
      }
    }
  },
  watch: {
    music1: {
      handler: function (n, o) {
        console.log(n)
      },
      deep: true
    }

  },
  methods: {
    isPlay (thic) {
      if (thic.showPlay === true) {
        thic.showMusicPlay = true
      } else {
        thic.showMusicPlay = false
      }
    },
    tabChange (index) {
      // eslint-disable-next-line no-unused-vars
      let thic = this
      console.log(index)
      switch (index) {
        case 0:
          console.log('发现页面显示')
          this.showFount = true
          this.showRanking = false
          this.showUser = false
          this.showQuery = true
          this.showFount = true
          this.showGd = false
          this.$options.methods.isPlay(thic)
          break
        case 1:
          console.log('排行页面显示')
          this.showFount = false
          this.showRanking = true
          this.showUser = false
          this.showGd = false
          this.showStartImg = true
          this.$options.methods.isPlay(thic)
          break
        case 2:
          console.log('我的页面显示')
          this.showFount = false
          this.showRanking = false
          this.showUser = true
          this.showGd = false
          this.showStartImg = true
          this.$options.methods.isPlay(thic)
          break
      }
    },
    changeLbImg (index) {
      this.current = index
    },
    toGdPage (gd) {
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
      this.showQuery = false
      this.showFount = false
      this.showGd = true
      this.gdSx.id = gd.id
      this.gdSx.name = gd.name
      this.gdSx.copywriter = gd.copywriter
      this.gdSx.picUrl = gd.picurl
      // 根据歌单ID 获取歌曲列表
      axios.get('http://47.99.165.122/liyang/music/getMusicAllByGdid.json', {params: { id: gd.id, page: this.gqPage, limit: this.gqLimit }}).then((res) => {
        this.gqList = res.data.data
        console.log(this.gqList)
        loding.clear()
        this.isShowGqText = true
      })
    },
    backFount () {
      console.log('返回')
      this.showFount = true
      this.showRanking = false
      this.showUser = false
      this.showQuery = true
      this.showFount = true
      this.showStartImg = true
      this.showGd = false
    },
    songde (gq) {
      this.showSongde = true
    },
    startMusic (gq) {
      // eslint-disable-next-line no-unused-vars
      //  判断播放是否为第一次播放
      this.showPlay = true
      this.music = gq
      document.title = gq.title
    },
    // 从歌单页面点击播放 点击返回
    backGd () {
      this.showQuery = false
      this.showFount = false
      this.showGd = true
      this.showMusicPlay = false
      this.showStartImg = true
    },
    zt () {
      // this.$refs.aplayer.play()
    },
    canplay () {
      // console.log('aplayer: ' + this.$refs.aplayer.showList())
      alert('歌曲已就绪')
      this.$refs.aplayer.play()
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
      // if (this.isLoadGq === false) {
      //   return
      // }
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
      axios.get('http://47.99.165.122/liyang/music/getMusicAllByGdid.json', {params: { id: this.gdSx.id, page: this.gqPage, limit: this.gqLimit }}).then((res) => {
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
  mounted: function () {

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
    /*
    // 获取每日歌单推荐 需要登录
    let localPhone = localStorage.getItem('localPhone')
    // eslint-disable-next-line no-unused-vars
    let localPass = localStorage.getItem('localPass')
    // eslint-disable-next-line no-unused-vars
    let localGdList = localStorage.getItem('gdList')
    // eslint-disable-next-line no-unused-vars
    let thisPhone = this.phone
    // eslint-disable-next-line no-unused-vars
    let thisPass = this.pass
    if (localPhone == null) {
      // eslint-disable-next-line no-unused-vars
      let loginUrl = 'https://musicapi.leanapp.cn/login/cellphone?phone=' + thisPhone + '&password=' + thisPass
      axios.get(loginUrl).then(function (res) {
        // eslint-disable-next-line no-unused-vars
        let code = res.data.code
        if (code === 200) {
          console.log('使用默认账号登录成功')
          localStorage.setItem('localPhone', thisPhone)
          localStorage.setItem('localPass', thisPass)
          // 如果歌单数据存在的话 就不用自动请求新歌单数据
          if (localGdList != null) {
            thic.gdList = JSON.parse(localGdList)
          } else {
            let mrtjUrl = 'https://musicapi.leanapp.cn/personalized?limit=' + thic.gdLimit
            axios.get(mrtjUrl).then(function (res) {
              thic.gdList = res.data.result
              localStorage.setItem('gdList', JSON.stringify(res.data.result))
            })
          }
        }
      })
    } else {
      let loginUrl = 'https://musicapi.leanapp.cn/login/cellphone?phone=' + localPhone + '&password=' + localPass
      axios.get(loginUrl).then(function (res) {
        // eslint-disable-next-line no-unused-vars
        let code = res.data.code
        if (code === 200) {
          console.log('使用本地登录信息 登录成功')
          // 如果歌单数据存在的话 就不用自动请求新歌单数据
          if (localGdList != null) {
            thic.gdList = JSON.parse(localGdList)
          } else {
            let mrtjUrl = 'https://musicapi.leanapp.cn/personalized?limit=' + thic.gdLimit
            axios.get(mrtjUrl).then(function (res) {
              thic.gdList = res.data.result
              localStorage.setItem('gdList', JSON.stringify(res.data.result))
            })
          }
        }
      })
    }
    */
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
      display: none;
    position: absolute;
    top: 10px;
    right: 2rem;
     -webkit-transition-property: -webkit-transform;
    -webkit-transition-duration: 1s;
    -moz-transition-property: -moz-transform;
    -moz-transition-duration: 1s;
    -webkit-animation: rotate 3s linear infinite;
    -moz-animation: rotate 3s linear infinite;
    -o-animation: rotate 3s linear infinite;
    animation: rotate 3s linear infinite;

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
.van-tabbar {
    z-index: 200;
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
    box-sizing: content-box;
    width: 100%;
    height: 50px;
    padding-bottom: constant(safe-area-inset-bottom);
    padding-bottom: env(safe-area-inset-bottom);
    background-color: #fff;
}
.musicFoot{
    position: fixed;
    bottom: 50px;
    width: 100%;
    z-index: 2020;
}
</style>
