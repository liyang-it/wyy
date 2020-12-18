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
          <!-- ,请打开Safari手动下载 -->
          <span class="custom-title" style="font-size: 15px;font-weight: bold;">检测到您的设备为:{{device}}</span>
        </div>
      </template>
  </van-cell>
  <div style="width: 100%;margin-top: 10px;">
    <!-- <img src="../../assets/jt.png" alt=""> -->
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<font style="font-size: 0.8rem;font-weight: 900;color:#2F4F4F;">歌曲:&nbsp;&nbsp;</font>
    <font class="van-ellipsis" style="font-size: 1.0rem;font-weight: 900;">{{gqName}}</font>
    <font style="font-size: 0.8rem;font-weight: 900;color:#2F4F4F;">歌手:&nbsp;&nbsp;</font>
    <font class="van-ellipsis" style="font-size: 1.0rem;font-weight: 900;">{{artist}}</font>
    <van-collapse v-model="activeNames">
      <van-collapse-item title="安卓下载" name="1">
        安卓和电脑可直接点击下载
        <br>
        <br>
      <van-button round color="linear-gradient(to right, #ff6034, #ee0a24)"  type="primary" class="d_btn" block @click="down">下载</van-button>
      </van-collapse-item>
      <van-collapse-item title="iOS下载" name="2">
        iPhone 需要 将 音乐链接 复制到请打开Safari进行手动下载,链接具有时效性，如果失效请返回重新点击下载
        <br>
        <br>
        <van-button round  color="linear-gradient(to right, #ff6034, #ee0a24)" type="primary" id="copy" class="d_btn" block >复制链接</van-button>
      </van-collapse-item>
    </van-collapse>
    <br>
    <br>
    <br>
  </div>
 </div>
</div>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》';
/* eslint-disable */
import axios from 'axios'
import {Skeleton,Cell, CellGroup,Icon,Toast,Collapse, CollapseItem,Button } from 'vant'
export default {
// import引入的组件需要注入到对象中才能使用
  components: {
    axios,
    [Skeleton.name]:Skeleton,
    [Cell.name]: Cell,
    [CellGroup.name]:CellGroup,
    [Icon.name]:Icon,
    [Toast.name]:Toast,
    [Collapse.name]: Collapse,
    [CollapseItem.name]:CollapseItem,
    [Button.name]:Button
  },
  data () {
    // 这里存放数据
    return {
      device: 'windows',
      isTrue: true,
      gqName:'',
      artist:'',
      src:'',
      isBr: false,
      activeNames: ['1','2']

    }
  },
  // 监听属性 类似于data概念
  computed: {},
  // 监控data中的数据变化
  watch: {},
  // 方法集合
  methods: {
    down () {
      let loding = Toast.loading({
        duration: 0,
        message: '加载中...',
        forbidClick: true,
        loadingType: 'spinner',
        forbidClick: true
      })

      let downUrl = this.src // 音乐地址
      let fileName = this.gqName + '-' +this.artist // 文件名设置
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
        loding.clear()
      })
  setTimeout(()=>{
    loding.clear()
  },3000)

    }
  },
  // 生命周期 - 创建完成（可以访问当前this实例）
  created () {

  },
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted () {
    let t = this
    let device_type = navigator.userAgent; //获取userAgent信息
    console.info(device_type)
    let md = new MobileDetect(device_type); //初始化mobile-detect
    let os = md.os(); //获取系统
    console.log(os)
    let model = "";
    if (os == "iOS") { //ios系统的处理
      // os = +md.version("iPhone");
      // console.log(os)
      // model = md.mobile();
      this.device = 'iPhone'
    } else if (os == "AndroidOS") { //Android系统的处理
      // os = md.os() + md.version("Android");
      // let sss = device_type.split(";");
      // let i = sss.contains("Build/");
      // if (i > -1) {
      //   model = sss[i].substring(0, sss[i].indexOf("Build/"));
      // }
      this.device = 'Android'
    }else{
      this.device = 'windows'
    }
    // console.log(model + '||' + os, '打印系统版本和手机型号')
    // if(model === 'iPhone'){
    //   this.isTrue = true
    //   this.device = model
    // }else{
    //   this.isTrue = false
    // }
      let clipboard = new Clipboard('#copy', {
    	   // 点击 id = copy 按钮，直接通过text直接返回复印的内容
    	       text: function() {
               console.info('复制',t.src)
               return t.src
    	       }
         })
        clipboard.on('success', function(e) {
    		   Toast.success('复制成功')
    	   })

    	   clipboard.on('error', function(e) {
    		   Toast.fail('复制失败!')
    	  })

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
    let isStart = this.$store.state.is.isShowPlayer
    if (isStart) {
      this.$store.commit('setIsShowTitle', false)
      // this.$store.commit('setIsStop', false)
    }
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
.d_btn{
  width: 80%;
  margin: 0 auto;
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
