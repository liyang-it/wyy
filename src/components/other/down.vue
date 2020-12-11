<!--  -->
<template>
<div class=''>
 <div class="head">
   <div class="head_bg">
     <img src="../../assets/wyy2.jpg" alt="">
   </div>
 </div>
 <div class="content">
  <van-cell v-show="isTrue">
      <template #title >
        <div>
          <span class="custom-title" style="font-size: 15px;font-weight: bold;">检测到您的设备为:{{device}},请打开Safari手动下载</span>
        </div>
      </template>
  </van-cell>
  <div style="width: 100%;margin-top: 10px;">
    <!-- <img src="../../assets/jt.png" alt=""> -->
    <font style="font-size: 0.8rem;font-weight: 900;color:#2F4F4F;">歌曲:&nbsp;&nbsp;</font>
    <font class="van-ellipsis" style="font-size: 1.0rem;font-weight: 900;">{{gqName}}</font>
    <font style="font-size: 0.8rem;font-weight: 900;color:#2F4F4F;">歌手:&nbsp;&nbsp;</font>
    <font class="van-ellipsis" style="font-size: 1.0rem;font-weight: 900;">{{artist}}</font>
    <audio style="width: 100%;" controls :src="src"></audio>
  </div>

 </div>
</div>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》';
/* eslint-disable */
import {Skeleton,Cell, CellGroup,Icon,Toast } from 'vant'
export default {
// import引入的组件需要注入到对象中才能使用
  components: {
    [Skeleton.name]:Skeleton,
    [Cell.name]: Cell,
    [CellGroup.name]:CellGroup,
    [Icon.name]:Icon,
    [Toast.name]:Toast
  },
  data () {
    // 这里存放数据
    return {
      device: '',
      isTrue: true,
      gqName:'',
      artist:'',
      src:''

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
    let device_type = navigator.userAgent; //获取userAgent信息
    console.info(device_type)
    let md = new MobileDetect(device_type); //初始化mobile-detect
    let os = md.os(); //获取系统
    console.log(os)
    let model = "";
    if (os == "iOS") { //ios系统的处理
      os = +md.version("iPhone");
      console.log(os)
      model = md.mobile();
    } else if (os == "AndroidOS") { //Android系统的处理
      os = md.os() + md.version("Android");
      let sss = device_type.split(";");
      let i = sss.contains("Build/");
      if (i > -1) {
        model = sss[i].substring(0, sss[i].indexOf("Build/"));
      }
    }
    console.log(model + '||' + os, '打印系统版本和手机型号')
    if(model === 'iPhone'){
      this.isTrue = true
      this.device = model
    }else{
      this.isTrue = false
    }

  },
  beforeCreate () {}, // 生命周期 - 创建之前
  beforeMount () {}, // 生命周期 - 挂载之前
  beforeUpdate () {}, // 生命周期 - 更新之前
  updated () {}, // 生命周期 - 更新之后
  beforeDestroy () {}, // 生命周期 - 销毁之前
  destroyed () {}, // 生命周期 - 销毁完成
  activated () {
    let music = JSON.parse(window.sessionStorage.getItem('down_music'))
    this.src = music.src
    this.gqName = music.alName
    this.artist = music.artist
    console.info(music)
  } // 如果页面有keep-alive缓存功能，这个函数会触发
}
</script>
<style  scoped>
/** scoped 表示 样式自在当前组件有效*/
  .custom-title {
    margin-right: 4px;
    vertical-align: middle;
  }

  .search-icon {
    font-size: 16px;
    line-height: inherit;
  }
.head{
  width: 100%;
  height: 300px;
  border: 1px solid pink;
}
.head_bg{
  height: 100%;
  width: 100%;
}
.head_bg img{
  width: 100%;
  height: 100%;
}
.content{
    margin-top: -10px;
    border-radius: 10px;
    overflow: auto;
}
@media(min-width: 668px){
  .head{
  height: 350px;
  border: 1px solid pink;
}
.head_bg img{
object-fit: cover;
}
}
</style>
