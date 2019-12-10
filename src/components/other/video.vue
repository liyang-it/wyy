<!--  -->
<template>
<div class=''>
  <div>
    <van-sticky>
      <van-nav-bar :title="title" left-text="返回" left-arrow @click-left="onClickLeft"/>
    </van-sticky>
  </div>
  <div style="margin-bottom: 10px;">
    <div id="videoIdv">
      <video :src="mvUrl" autoplay controls></video>
    </div>
  </div>
  <div style="margin-left:10px;">
    <div class="videoTitle">
      <div class="van-multi-ellipsis--l2">
        <span>{{mv.name}} - {{mv.artistName}}</span>
      </div>
    </div>
    <div class="videoPlay">
      <span>{{mv.playCount}}&nbsp;&nbsp;次观看</span>
    </div>
    <br>
    <div class="videoDesc">
      <span>发布:&nbsp;&nbsp;{{mv.publishTime}}</span><br>
      <span>{{mv.desc}}</span>
    </div>
    <strong>精彩评论</strong>
    <div class="videoPl">
      <div style="margin-top: 10px;">
        <div v-for="(item,index) in pl" :key="index" style="margin:20px 0px;">
          <van-image round width="2.5rem" height="2.5rem" :src="item.user.avatarUrl"/>
          <font >{{item.user.nickname}}:</font>
          <span>{{item.content}}</span>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》';
import { Cell, CellGroup, Image as VanImage, Toast, NavBar, Sticky, Notify } from 'vant'
import axios from 'axios'
/* eslint-disable */
export default {
// import引入的组件需要注入到对象中才能使用
  components: {
    axios,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [VanImage.name]: VanImage,
    [Toast.name]: Toast,
    [NavBar.name]: NavBar,
    [Sticky.name]: Sticky,
    [Notify.name]: Notify 
  },
  data () {
    // 这里存放数据
    return {
      mvUrl:'',
      mv:{},
      pl:[],
      title: ''
    }
  },
  // 监听属性 类似于data概念
  computed: {},
  // 监控data中的数据变化
  watch: {},
  // 方法集合
  methods: {
    onClickLeft () {
      let isStart = this.$store.state.is.isShowPlayer
      if (isStart === true) {
        this.$store.commit('setIsShowTitle', true)
      }
      this.$router.go(-1)
    }
  },
  // 生命周期 - 创建完成（可以访问当前this实例）
  created () {
  },
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted () {

  },
  beforeCreate () {}, // 生命周期 - 创建之前
  beforeMount () {}, // 生命周期 - 挂载之前
  beforeUpdate () {}, // 生命周期 - 更新之前
  updated () {}, // 生命周期 - 更新之后
  beforeDestroy () {}, // 生命周期 - 销毁之前
  destroyed () {}, // 生命周期 - 销毁完成
  activated () {
    let loding = Toast.loading({
        duration: 0,
        message: '加载视频数据中...',
        forbidClick: true,
        loadingType: 'spinner',
        forbidClick: true
      })
    let t = this
    let mvid = this.$route.params.id
    console.info(mvid)
    axios.all(
      [
      axios.get('http://liyangit.top:3000/video/url?id='+mvid),
      axios.get('http://liyangit.top:3000/video/detail?id='+mvid),
      axios.get('http://liyangit.top:3000/comment/video?id='+mvid+'&limit=100')
      ]
      ).then(res=>{

        t.mvUrl = res[0].data.urls[0].url
        t.mv.name = res[1].data.data.title
        t.mv.artistName = res[1].data.data.creator.nickname 
        t.mv.playCount = res[1].data.data.praisedCount
        // 先 var unixTimestamp = new Date(Unix timestamp * 1000) 然后 commonTime = unixTimestamp.toLocaleString()
        let date = new Date(res[1].data.data.publishTime)
        t.mv.publishTime = date.toLocaleDateString() +'    '+date.toLocaleTimeString()
        t.mv.desc = '发布人:' + t.mv.artistName + ',简介:' + res[1].data.data.description
        t.title = t.mv.name
        document.title = t.mv.name
        t.pl = res[2].data.comments
        loding.clear()
      })
  } // 如果页面有keep-alive缓存功能，这个函数会触发
}
</script>
<style  scoped>
/** scoped 表示 样式自在当前组件有效*/
#videoIdv{
  width: 100%;
}
#videoIdv video{
  width: 100%;
}
.videoImg img{
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.videoTitle {
  font-family:'Raleway', 'Open Sans', sans-serif;
  font-synthesis: initial;
  font-weight: bold;
  margin-bottom: 10px;
}
.videoPlay{
  font-family:'Raleway', 'Open Sans', sans-serif;
  font-synthesis: initial;
  font-weight: bold;
  color: rgba(69, 90, 100, 0.6);
  font-size: 10px;
}
.videoDesc{
  font-family:'Raleway', 'Open Sans', sans-serif;
  font-synthesis: initial;
  font-weight: bold;
  color: rgba(69, 90, 100, 0.6);
  margin-bottom: 5px;
}
.videoPl{
  margin-bottom: 100px;
}
.videoPl font {
  margin-left: 10px;
  font-size: 0.8rem;
  position: absolute;
  font-family:'Raleway', 'Open Sans', sans-serif;
  font-synthesis: initial;
  font-weight: bold;
  color: rgba(69, 90, 100, 0.6);
}
.videoPl span {
  margin-left: 10px;
  font-size: 15px;
  font-family:'Raleway', 'Open Sans', sans-serif;
  font-synthesis: initial;
  font-weight: bold;
}
.van-nav-bar__left, .van-nav-bar__right {
    position: absolute;
    top: 0;
    bottom: 0;
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
    -webkit-box-align: center;
    -webkit-align-items: center;
    align-items: center;
    padding: 0 10px;
    font-size: 12px;
    cursor: pointer;
}
</style>
