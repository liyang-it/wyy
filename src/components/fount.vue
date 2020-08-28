<template>
  <div >
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
</template>
<script>
/** 局部引入vant 组件 */
// eslint-disable-next-line no-unused-vars
import { Toast, Search, Circle, Sticky, Col, Row, Image as VanImage, Swipe, SwipeItem, Button, PullRefresh, Grid, GridItem, Tabbar, TabbarItem, Notify } from 'vant'
import axios from 'axios'
export default {
  /** 注册组件 */
  components: {
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
    [TabbarItem.name]: TabbarItem
  },
  name: 'found',
  data () {
    return {
      phone: '15575141967',
      pass: 'liyang664243',
      currentRate: 10,
      current: 0,
      columnGd: 3,
      gdList: [],
      gdLimit: 102,
      lbList: ['https://img.yzcdn.cn/vant/apple-2.jpg', 'https://img.yzcdn.cn/vant/apple-1.jpg', 'https://img.yzcdn.cn/vant/apple-3.jpg', 'https://img.yzcdn.cn/vant/apple-4.jpg']
    }
  },
  methods: {
    changeLbImg () {},
    toGdPage (gd) {
      // 携带歌单对象 跳转到歌单页面
      console.log(gd)
      localStorage.setItem('gd', JSON.stringify(gd))
      this.$router.push({
        path: '/gdPage',
        name: 'gdPage'
      })
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
            console.log(localGdList)
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
</style>
