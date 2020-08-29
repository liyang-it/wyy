/* eslint-disable no-dupe-keys */
/* eslint-disable no-unused-vars */
<template>
<div id="app">
  <!-- 头部  搜索款和播放按键-->
<div >
  <van-sticky :offset-top="0">
      <div v-show="showQuery"><van-search :placeholder="Placeholder" /></div>
      <div class="playImg"><van-image
          round
          width="2rem"
          height="2rem"
          fit="cover"
          src="https://img.yzcdn.cn/vant/cat.jpeg"
        />
      </div>
  </van-sticky>
</div>
<!--歌单详情-->
<div  v-show="showGd" >
   <div style="position: absolute;top: 10px;left: 20px;"><van-icon name="arrow-left" color="white" size="30" @click="backFount"/></div>
        <img :src="gdSx.picUrl" style="width: 100%;height:375px;">
        <div style="">
          <van-cell v-for="(gq, i) in gqList" :key="gq.index">
            <template #title>
              <font style="color: tan;font-size: 1.2rem;">{{i + 1}}</font>
            </template>
            <template #right-icon>
                <van-icon name="search" class="more" />
            </template>
          </van-cell>

        </div>
</div>
 <div v-show="showFount">
 <van-sticky :offset-top="53" class="head">

   <!--轮播图片-->
  <div style="width: 90%;margin: auto;height: 180px;    box-shadow: 0px 0px 20px 3px pink;margin-top:10px;" id="lb">
  <van-swipe  :autoplay="10000"  @change="changeLbImg" :height="180" >
    <van-swipe-item v-for="value in lbList" :key="value.index">
      <img :src="value" alt="" class="lbImg"></van-swipe-item>
    <template #indicator>
    <div class="custom-indicator">
      {{ current + 1 }}/{{lbList.length}}
    </div>
  </template>
  </van-swipe>
  </div>
  <h3 style="color: black;">每日歌单推荐 <van-button plain hairline type="info" size="mini " style="position: absolute;right: 40px;">查看更多</van-button></h3>
  </van-sticky>
  <!-- 歌单-->
  <div class="gd" >

    <div>
      <van-grid :column-num="columnGd">
        <van-grid-item v-for="gd in gdList" :key="gd.index" class="xf" @click="toGdPage(gd)">
          <div >
          <van-image  :src="gd.picUrl" />
          <span  class="bfl">{{ (gd.playCount/10000)}}万</span>
          <div><span style="font-size: 0.1rem;" class="text">{{ (gd.name).substring(0,12)}}....</span></div>
          </div>

        </van-grid-item>
      </van-grid>
    </div>
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
import { Toast, Search, Circle, Sticky, Col, Row, Image as VanImage, Swipe, SwipeItem, Button, PullRefresh, Grid, GridItem, Tabbar, TabbarItem, Notify, Icon, List, Loading, Cell, CellGroup } from 'vant'
// 引入自定义组件
import fount from '@/components/fount'
import axios from 'axios'
export default {
  /** 注册组件 */
  components: {
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
    fount,
    [Icon.name]: Icon,
    [List.name]: List,
    [Loading.name]: Loading,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup
  },
  name: 'index',
  data () {
    return {
      gqList: [],
      gqList2: [],
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
      gdLimit: 102,
      lbList: ['https://img.yzcdn.cn/vant/apple-2.jpg', 'https://img.yzcdn.cn/vant/apple-1.jpg', 'https://img.yzcdn.cn/vant/apple-3.jpg', 'https://img.yzcdn.cn/vant/apple-4.jpg'],
      showGd: false,
      gdSx: {
        id: null,
        name: null,
        copywriter: null,
        picUrl: null
      }
    }
  },
  methods: {
    tabChange (index) {
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
          break
        case 1:
          console.log('排行页面显示')
          this.showFount = false
          this.showRanking = true
          this.showUser = false
          break
        case 2:
          console.log('我的页面显示')
          this.showFount = false
          this.showRanking = false
          this.showUser = true
          break
      }
    },
    changeLbImg () {},
    async toGdPage (gd) {
      //  加载
      // eslint-disable-next-line no-unused-vars
      let loding = Toast.loading({
        duration: 0,
        message: '加载歌曲中...',
        forbidClick: true,
        loadingType: 'spinner',
        // eslint-disable-next-line no-dupe-keys
        forbidClick: true
      })
      // 根据歌单ID 获取歌曲列表
      let url = 'https://musicapi.leanapp.cn/playlist/detail?id=' + gd.id
      await axios.get(url).then((response) => {
        /*
        说明 : 歌单能看到歌单名字, 但看不到具体歌单内容 , 调用此接口 ,
        传入歌单 id, 可 以获取对应歌单内的所有的音乐(未登录状态只能获取不完整的歌单,登录后是完整的)，
        但是返回的trackIds是完整的，tracks 则是不完整的，可拿全部 trackIds 请求一次 song/detail
        */
        let trackIds = response.data.playlist.trackIds
        // eslint-disable-next-line no-unused-vars
        for (let i = 0; i < trackIds.length; i++) {
          let gqUrl = 'https://musicapi.leanapp.cn/song/detail'
          axios.get(gqUrl, {params: {ids: trackIds[i].id}}).then((res) => {
            this.gqList2[i] = res.data.songs[0]
          })
        }
        console.log('歌曲总条数: ' + trackIds.length)
      // 如果请求完成后 清除loding状态 显示歌曲列表
      })
      loding.clear()
      this.showQuery = false
      this.showFount = false
      this.showGd = true
      this.gdSx.id = gd.id
      this.gdSx.name = gd.name
      this.gdSx.copywriter = gd.copywriter
      this.gdSx.picUrl = gd.picUrl
      /*
      localStorage.setItem('gd', JSON.stringify(gd))
      this.$router.push({
        path: '/gdPage',
        name: 'gdPage'
      })
      */
    },
    backFount () {
      console.log('返回')
      this.showFount = true
      this.showRanking = false
      this.showUser = false
      this.showQuery = true
      this.showFount = true
      this.showGd = false
    }

  },
  mounted: function () {

  },
  created () {
    document.title = 'LiYangMuSic'
    // eslint-disable-next-line no-unused-vars
    let thic = this
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
}
.van-sticky{
  background-color: white;
}
.playImg{
    width: 2rem;
    height: 2rem;
    position: absolute;
    top: 10px;
    right: 2rem;
    -webkit-animation-name: layui-rotate;
    animation-name: layui-rotate;
    /* -webkit-animation-duration: 1s; */
    animation-duration: 1s;
    -webkit-animation-timing-function: linear;
    animation-timing-function: linear;

}
.lbImg{
  height: 100%;
  width: 100%;
}
.van-swipe__indicator--active{
  background-color: red;
}
.bfl{
  font-size: 0.1rem;
  font-size: 0.1rem;
    color: white;
    position: absolute;
    top: 20px;
    right: 15px;
}
.xf :hover .text{
  color: red;

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
</style>
