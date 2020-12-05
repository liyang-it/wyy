<!--  -->
<template>
<div class=''>
  <div>
    <van-sticky>
      <van-nav-bar :title="title" left-text="返回" left-arrow @click-left="onClickLeft"/>
    </van-sticky>
  </div>
  <div class="pl">
    <div class="plDiv">
      <br>
    <strong>精彩评论</strong>
    <div class="gqPl">
      <div style="margin-top: 10px;">
        <div v-for="(item,index) in pls" :key="index" style="margin:20px 0px;">
          <van-image round width="2.5rem" height="2.5rem" :src="item.user.avatarUrl"/>
          <font >{{item.user.nickname}}:</font>
          <strong>{{item.likedCount}}<van-icon name="good-job" ></van-icon></strong>
          <span>{{item.content}}</span>
        </div>
      </div>
    </div>
    <div style="width: 150px;margin: 0 auto;margin-bottom: 50px;margin-top: 10px;">
      <van-button round color="linear-gradient(to right, #ff6034, #ee0a24)" type="primary" block @click="loadPl">加载更多评论</van-button>
    </div>
    <br>
  </div>
  </div>
</div>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》';
/* eslint-disable */
import { NavBar, Sticky, Image as VanImage, Icon, Button, Toast } from 'vant'
import axios from 'axios'
export default {
// import引入的组件需要注入到对象中才能使用
  components: {
    axios,
    [NavBar.name]: NavBar,
    [Sticky.name]: Sticky,
    [VanImage.name]: VanImage,
    [Icon.name]: Icon,
    [Button.name]: Button,
    [Toast.name]: Toast
  },
  data () {
    // 这里存放数据
    return {
      title: '',
      pls: [],
      page: 1,
      limit: 50

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
    },
    loadPl () {
      // 加载评论
      let loding = Toast.loading({
        duration: 0,
        message: '加载评论中...',
        forbidClick: true,
        loadingType: 'spinner',
        forbidClick: true
      })
       this.page = this.page + 1
       axios.get('http://liyangit.top:3000/comment/music?id='+this.$route.params.id+'&offset='+(this.page - 1) * this.limit+'&limit='+this.limit).then((res)=>{
        for (let i = 0; i< res.data.comments.length; i++) {
          this.pls.push(res.data.comments[i])
        }
        loding.clear()
       })
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
        message: '加载评论中...',
        forbidClick: true,
        loadingType: 'spinner',
        forbidClick: true
      })
    let t = this
    let id = t.$route.params.id
    axios.all(
      [
        axios.get('http://liyangit.top:3000/song/detail?ids='+id),
        axios.get('http://liyangit.top:3000/comment/music?id='+id+'&offset='+(t.page - 1) * t.limit+'&limit='+t.limit)
        ]
      ).then(res=>{
        t.title = res[0].data.songs[0].name + ' - ' +res[0].data.songs[0].ar[0].name
        document.title = t.title
        t.pls = res[1].data.comments
        loding.clear()
      })
  } // 如果页面有keep-alive缓存功能，这个函数会触发
}
</script>
<style  scoped>
/** scoped 表示 样式自在当前组件有效*/
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
.pl{
 background-color: rgb(246, 245, 238);
  margin-bottom: 60px;
  
}
.plDiv{
   margin-left: 10px;
}
.gqPl font {
  margin-left: 10px;
  font-size: 0.8rem;
  position: absolute;
  font-family:'Raleway', 'Open Sans', sans-serif;
  font-synthesis: initial;
  font-weight: bold;
  color: rgba(69, 90, 100, 0.6);
}
.gqPl span {
  margin-left: 10px;
  font-size: 15px;
  font-family:'Raleway', 'Open Sans', sans-serif;
  font-synthesis: initial;
  font-weight: bold;
}
.gqPl strong{
  right: 10px;
  position: absolute;
  color: #ff976a;
}
@media(min-width: 768px){
  .gqPl strong{
    left: 680px;
    top: -35px;
    position: relative;
    color: #ff976a;
}
}
</style>
