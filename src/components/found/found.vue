<template>
<div id="app2">
<div >
  <!--搜索框 固定-->
  <van-sticky :offset-top="0">
      <div v-show="showQuery"><van-search :placeholder="Placeholder" @click="search"/></div>
  </van-sticky>
</div>
<!--歌单详情(歌曲列表)-->
<transition name="van-fade">
<div  v-show="isShowGd" >
   <div style="position: relative;top: 10px;left: 20px;" @click="backFount"><van-icon name="arrow-left" color="white" size="30" ></van-icon><span style="font-size: 18px;color: white;top: -8px;position: relative;font-weight: bold;">返回</span></div>
   <div style="position: relative;top: 170px;left: 10px;color: white;"><span>{{gdSx.name}}</span><br><span>--     {{gdSx.copywriter}}</span></div>
   <div id="gdxqImg">
     <img :src="gdSx.picUrl" style="width: 100%;height: 100%;object-fit: fill;">
   </div>
        <div>
          <van-cell v-for="(gq, i) in gqList" :key="gq.index" :label="gq.artist+' - '+gq.alName" >
            <template #title >
             <div @click="startMusic(gq)" ><font style="color: tan;font-size: 1.2rem;">{{i + 1}}</font>
             <span class="van-ellipsis " style="margin-left: 10px;font-size: 1.0rem;font-weight: bold;" id="gqTitle">{{gq.title}}</span>
             </div>
            </template>
            <template #right-icon>
                <van-icon name="bars" class="more" size="35" @click="songde(gq)" style="background-color: white;position: absolute;right: 5px;"/>
            </template>
          </van-cell>
          <div class="loadGqBtn" :style="{'margin-bottom':marginBottom + 'px'}" v-if="isShowGqText" >
            <van-button round color="linear-gradient(to right, #ff6034, #ee0a24)" type="primary" block @click="loadGq">{{loadGqText}}</van-button>
          </div>
          <br>
        </div>
  <!-- songde 歌曲详情按钮-->
  <div id="popup_id">
      <van-popup v-model="showSongde" round position="bottom" :style="{ height: '30%' }" >
        <song-popup :music_popup="music_popup"></song-popup>
      </van-popup>
  </div>

</div>
</transition>
  <!--轮播图片 、歌单 、 新音乐-->
 <div v-show="showFount">
  <div class="found_lb"  id="lb">
  <van-swipe  :autoplay="3000"  @change="changeLbImg"  >
    <van-swipe-item v-for="value in lbList" :key="value.index">
      <img :src="value.picurl" alt="" class="lbImg" @click="toGdPage(value)">
    </van-swipe-item>
    <template #indicator>
    <div class="custom-indicator found_lbText">
      {{ current + 1 }}/{{lbList.length}}
    </div>
  </template>
  </van-swipe>
  </div>
  <!-- 每日新音乐-->
  <div>
    <div style="width: 120px;height:30px;">
        <div>
          <img src="../../assets/plant2.png" alt="" style="height: 30px; width: 30px;">
        </div>
        <div style="margin-left: 30px;margin-top: -30px;">
          <p style="margin: 0px 0px 0px 0px;font-size: 18px;font-weight: 900;">新歌</p>
        </div>
    </div>
    <div>
      <!--新音乐组件-->
      <newsong @editMarginBottom="editMarginBottom"></newsong>
    </div>
  </div>
  <!-- 歌单列表-->
  <div id="gdDiv" class="gd"  >
    <div style="width: 120px;height:30px;">
        <div>
          <img src="../../assets/plant1.png" alt="" style="height: 30px; width: 30px;">
        </div>
        <div style="margin-left: 30px;margin-top: -30px;">
          <p style="margin: 0px 0px 0px 0px;font-size: 18px;font-weight: 900;">推荐歌单</p>
        </div>
    </div>
    <div>
       <!--  -->
      <van-grid :column-num="columnGd" :style="{'margin-bottom':marginBottom + 'px'}">
        <van-grid-item class="xf"  v-for="gd in gdList" :key="gd.index" @click="toGdPage(gd)" >
          <div >
            <div class="xfImg">
               <van-image  :src="gd.picurl" />
            </div>
            <p class="bfl"><van-icon name="service-o" size="15"></van-icon> {{ gd.playcount}}</p>
            <div style="height: 20px;">
              <span  class="gdText">{{ gd.name.substring(0,6)}}...</span>
            </div>
          </div>
        </van-grid-item>
        <div  style="margin-top: 20px;width: 150px;margin: 0 auto;" >
          <br>
        <van-button round color="linear-gradient(to right, #ff6034, #ee0a24)" type="primary" block @click="loadGd">{{loadGdText}}</van-button>
      </div>
      </van-grid>
      <br>
      <br>
      <br>
    </div>
  </div>
</div>
</div>
</template>
<script>
/* eslint-disable */
/** 局部引入vant 组件 */
import { NoticeBar, Popup, Toast, Search, Circle, Sticky, Col, Row, Image as VanImage, Swipe, SwipeItem, Button, PullRefresh, Grid, GridItem, Tabbar, TabbarItem, Notify, Icon, List, Loading, Cell, CellGroup } from 'vant'
// 引入自定义组件
import axios from 'axios'
import playerApi from '@/api/playerApi.js'
const newsong = () => import('@/components/found/newsong')
const songPopup = () => import('@/components/found/song-popup')
export default {
  /** 注册组件 */
  components: {
    songPopup,
    playerApi,
    newsong,
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
    [NoticeBar.name]: NoticeBar
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
      },
      osText: '',
      music_popup: {},
      marginBottom: 50
    }
  },
  watch: {
  },
  methods: {
    // 点击 搜索框
    search () {
      this.$router.push({path:'/search'})
    },
    changeLbImg (index) {
      this.current = index
    },
    // 点击歌单 显示 歌单详细 歌曲列表
    toGdPage (gd) {
      //  加载
      let loding = Toast.loading({
        duration: 0,
        message: '加载中...',
        forbidClick: true,
        loadingType: 'spinner',
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
        let t = document.body.clientHeight // 获取页面最大高度 window.scroll({ top: t, left: 0, behavior: 'smooth' }) 滚动到页面最底部
        window.scroll({ top: 0, left: 0, behavior: 'smooth' }) // 滚动到页面最顶部
      })
    },
    // 歌单返回 首页
    backFount () {
      this.$store.commit('setIsShowFound', true)
      this.$store.commit('hideGd')
    },
    // 歌曲列表 歌曲详情
    songde (gq) {
      gq.alName = gq.title
      this.music_popup = gq
      this.showSongde = true
    },
    // 播放音乐
    startMusic (gq) {
      let loding = Toast.loading({
        duration: 0,
        message: '加载中...',
        forbidClick: true,
        loadingType: 'spinner',
        forbidClick: true
      })
        // 请求获取评论
      let geMusicUrl = 'http://liyangit.top:3000/song/url?id=' + gq.id
      let plUrl = 'https://www.liyangit.top:9443/comment/hot?id='+gq.id+'&type=0&limit=50'
      axios.all([
        axios.get(geMusicUrl),
        axios.get(plUrl)
      ]).then(res=>{
        console.info(res)
        gq.src = res[0].data.data[0].url
        gq.pls = res[1].data.hotComments
        if (gq.src === null) {
          Toast.fail('该音乐已被网易云设置付费可享!')
        }
        // 判断是否正在播放 如果正在播放 不需要重新设置音乐
        document.title = gq.title + '' + gq.artist
        let isStart = this.$store.state.musicStatus.isStart
        if (isStart === false) {
          this.$store.commit('setMusic', gq)
        } else {
          // 判断 播放是否为同一首歌曲 如果是 继续播放 不用重置音乐
          let gqid = this.$store.state.music.id
          if (gqid !== gq.id) {
            this.$store.commit('setMusic', gq)
            // this.$store.commit('setPlayerStyle', '')
          } else {
            // this.$store.commit('setPlayerStyle', '')
          }
        }
        this.marginBottom = 160
        setTimeout(()=>{
          // 两秒之后才显示播放界面，网络波动时可以去除音乐加载中的空白效果
          loding.clear()
          playerApi.showPlay()
        },2000)

        let t = document.body.clientHeight // 获取页面最大高度 window.scroll({ top: t, left: 0, behavior: 'smooth' }) 滚动到页面最底部
        window.scroll({ top: 0, left: 0, behavior: 'smooth' }) // 滚动到页面最顶部
      })
    },
    // 实现每日新音乐 组件点击播放后 更改  歌曲界面的 加载按钮 样式
    editMarginBottom () {
      this.marginBottom = 160
    },
    // 加载更多歌单
    loadGd () {
      if (this.isLoadGd === false) {
        return
      }
      let loding = Toast.loading({
        duration: 0,
        message: '加载歌单...',
        forbidClick: true,
        loadingType: 'spinner',
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
    // 加载更多歌曲
    loadGq () {
      let loding = Toast.loading({
        duration: 0,
        message: '加载歌曲...',
        forbidClick: true,
        loadingType: 'spinner',
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
    let thic = this
    axios.get('http://www.liyangit.top/liyang/music/getPlayList.json', {params: {page: this.gdPage, limit: this.gdLimit}}).then((res) => {
      thic.gdList = res.data.data
      thic.lbList = thic.gdList.slice(13,23)
    })
  },
  activated () {
    let t = this
    let isStart = t.$store.state.is.isShowPlayer
    if (isStart === true) {
        t.marginBottom = 160
        this.$store.commit('setIsShowTitle', true)
        // this.$store.commit('setIsStop', true)
    }
  } 
}
</script>
<style lang="scss">
div{
  /** 所有div 当鼠标 移动到 div中改变鼠标样式*/
  cursor: pointer;
}
.found_lbText{
  font-size: 1.5rem;
}
.custom-indicator {
    position: absolute;
    right: 5px;
    bottom: 5px;
    padding: 2px 5px;
    background: rgba(0, 0, 0, 0.1);
    color: white;
  }
.head {
  width: 100%;
  color: white;
  margin-top: -10px;
}
.van-sticky{
  background-color: white;
}
.lbImg{
  height: 100%;
  width: 100%;
  object-fit: fill;
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
/** img 动画样式 */
.van-image__img {
  transition: all 0.3s linear;
  -webkit-transition: all 0.3s linear;
}

/**图片上层div */
.xfImg{
  transition: all 0.3s linear;
  -webkit-transition: all 0.3s linear;
}
.xfImg:hover{
  box-shadow: 0px 0px 8px 2px rgb(131, 128, 128);
}
/**鼠标移动 img到内容触发效果 字体变红 图片变大 */
.van-grid-item__content--center:hover{
  .gdText{
    color: red;
  }
  .van-image__img{
    transform: scale(1.1)
  }
}
/** 图片放大 溢出的部分隐藏 */
.van-image{
  overflow: hidden;
}
.gdText{
    font-size: 0.8rem;
    font-weight: 600;
    -webkit-transition: all 0.2s linear;
    transition: all 0.2s linear;
}
.musicFoot{
    position: fixed;
    bottom: 50px;
    width: 100%;
    z-index: 2020;
}
.van-search__content {
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
    -webkit-box-flex: 1;
    -webkit-flex: 1;
    flex: 1;
    padding-left: 12px;
    background-color:#A4A4A4;
    border-radius: 20px;
}
.found_lb{
  width: 98%;
  margin: 10px auto;
  height: 250px;
  box-shadow: 0px 0px 8px 1px black;
}
.van-swipe {
    position: relative;
    overflow: hidden;
    cursor: grab;
    -webkit-user-select: none;
    user-select: none;
    height: 250px;
}
.gd{
  margin-top: 10px;
}
#gdxqImg{
  width: 100%;
  height:280px;
  margin-top: -80px;
}
.loadGqBtn{
    margin: 10px auto;
    width: 150px;
}
.van-field__control {
    display: block;
    box-sizing: border-box;
    width: 100%;
    min-width: 0;
    margin: 0;
    padding: 0;
    color: white;
    line-height: inherit;
    text-align: left;
    background-color: transparent;
    border: 0;
    resize: none;
}
#gqTitle{
  transition: all 0.2s linear;
  -webkit-transition: all 0.2s linear;
}
.van-cell__title:hover{
  #gqTitle{
  color: red;
  text-decoration: underline;
}
}

@media(min-width: 768px){
  #popup_id{
    .van-popup--bottom {
    bottom: 0;
    left: 0;
    right:0;
    margin: 0 auto;
    width: 768px;
    }
  }

#gdxqImg{
  width: 100%;
  height:350px;
  margin-top: -80px;
}
.xfImg{
  height: 240px;
}
}
</style>
