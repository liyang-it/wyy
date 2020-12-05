<!--  -->
<template>
<div class='' >
  <van-sticky :offset-top="0">
    <van-nav-bar title="歌单" left-text="返回" left-arrow @click-left="$router.go(-1)"/>
  </van-sticky>
  <div>
    <div class="imgDiv" >
      <img :src="backgroundImg2" alt="">
    </div>
    <div class="sltDiv">
      <div class="slt">
        <img :src="backgroundImg" alt="">
      </div>
      <div class="content">
        <span>{{gdName}}</span>
         <p>{{desc}}啊实打实大实打实的啥大所大所大所大所大所大所多阿仕顿阿仕顿阿仕顿奥术大师大所多撒多</p>
      </div>
    </div>
    <div class="musics">
      我是第三个内容
    </div>
  </div>
</div>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》';
/* eslint-disable */
import axios from 'axios'
import {Sticky,NavBar,Icon  } from 'vant'
export default {
// import引入的组件需要注入到对象中才能使用
  components: {
    [Sticky.name]: Sticky,
    [NavBar.name]: NavBar,
    [Icon.name]: Icon
  },
  data () {
    // 这里存放数据
    return {
      backgroundImg:'',
      backgroundImg2:'',
      gdName: '',
      desc: '',
      gqIds: [],
      gqs: []
    }
  },
  // 监听属性 类似于data概念
  computed: {},
  // 监控data中的数据变化
  watch: {},
  // 方法集合
  methods: {

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
    let t = this 
    let id = t.$route.params.id
    axios.get('http://liyangit.top:3000/playlist/detail?id='+id).then((res=>{
      t.backgroundImg = res.data.playlist.coverImgUrl
      t.backgroundImg2 = res.data.playlist.creator.backgroundUrl
      t.gdName = res.data.playlist.name
      t.desc = res.data.playlist.description
      console.info(res.data.playlist.trackIds)
    }))

  } // 如果页面有keep-alive缓存功能，这个函数会触发
}
</script>
<style scoped>
/** scoped 表示 样式自在当前组件有效*/
.imgDiv{
  width: 100%;
  height: 250px;
}
.imgDiv img{
    width: 100%;
    height: 100%;
    /* filter: blur(10px); */
    object-fit: cover;
}
.sltDiv{
    position: relative;
    top: -180px;
    width: 90%;
    margin: 0 auto;
    right: 0;
    left: 0;
}
.sltDiv .slt{
  width: 140px;
  height: 140px;
  float: left;
}
.sltDiv .slt img{
    width: 100%;
    height: 100%;
}
.sltDiv .content{
  margin-left: 150px;
  width: 60%;
  word-break:normal;
  display:block;
  word-wrap:break-word;
  height: 140px;
}
.content span{
  font-size: 1rem;
  font-family:'Raleway', 'Open Sans', sans-serif;
  font-synthesis: initial;
  font-weight: bold;
  color: white;
  width:100%;
}
.content p{
  font-size: 0.8rem;
  font-family:'Raleway', 'Open Sans', sans-serif;
  font-synthesis: initial;
  font-weight: bold;
  color: rgb(204, 196, 196);
  width:100%;
  margin-top: 70px;
  overflow: hidden;  
  display: -webkit-box;  
  -webkit-line-clamp: 2;
  -webkit-box-orient:vertical;
  text-decoration:underline;
  
}
.musics{
  border-radius: 13px;
  overflow: auto;
  background-color: white;
  padding: 10px;
  position: relative;
  top: -150px;
}
</style>
