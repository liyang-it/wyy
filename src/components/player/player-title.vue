<!--  -->
<template>
<div id="musicTitleDiv_">
<div class='musicTitleDiv'>
  <div class=" musicTitleImg">
    <img :src="$store.state.music.pic" alt="" @click="clickIconShowPlay">
  </div>
  <div class="musicTitleName">
    <div class="van-multi-ellipsis--l2">
         <span>{{$store.state.music.title}}</span><span>&nbsp;&nbsp;-&nbsp;&nbsp;</span><span>{{$store.state.music.artist}}</span>
    </div>
  </div>
  <div class="musicTitleJdt">
       <table id="tt">
        <tr style="height: 40px;">
          <td style="font-size: 10px;width:40px;text-align: left;" ><font>{{$store.state.musicStatus.startTime}}</font></td>
          <td>
            <van-slider v-model="$store.state.musicStatus.jdt" bar-height="4px" active-color="#ee0a24" :max="$store.state.musicStatus.maxPlayTime" >
            </van-slider>
          </td>
          <td style="font-size: 10px;width:40px;text-align: right;"><font>{{$store.state.musicStatus.stopTime}}</font></td>
        </tr>
        <!--
          <tr>
          <td><van-icon name="exchange" size="30" color="white"/></td>
          <td><van-icon :name="playIcon" size="35" @click="play" color="white" /></td>
          <td><van-icon name="down"  size="30" @click="down" color="white"/></td>
          <td></td>
        </tr>
        -->
      </table>
  </div>
</div>
</div>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》';
import { Slider } from 'vant'
import playerApi from '@/api/playerApi.js'
export default {
  props: {
    musicObject: {
      type: Object
    }

  },
  // import引入的组件需要注入到对象中才能使用
  components:
  {
    playerApi,
    [Slider.name]: Slider
    // [Button.name]: Button
  },
  data () {
    // 这里存放数据
    return {
      jdt: 10

    }
  },
  // 监听属性 类似于data概念
  computed: {},
  // 监控data中的数据变化
  watch: {},
  // 方法集合
  methods: {
    // 点击 悬浮播放组件
    clickIconShowPlay () {
      playerApi.showPlay()
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
  activated () {} // 如果页面有keep-alive缓存功能，这个函数会触发
}
</script>
<style scoped>
/** scoped 表示 样式自在当前组件有效*/
/** asd*/
@media (min-width: 375px){
  #tt{
    width: 70%;
  }
}
@media (max-width: 374px){
  #tt{
    width: 65%;
  }
}
.musicTitleDiv{
  width: 85%;
  margin: 0px 0px 0px 15px;
  bottom: 60px;
  /* left: 0px;
  right: 0px; */
  box-shadow: 0px 0px 5px black;
  border-radius: 0.5rem;
  padding: 5px;
  position: fixed;
  height: 80px;
  z-index: 3;
  background-color: white;
}
 .musicTitleImg{
  width: 80px;
  height: 80px;
  float: left;
  margin-right: 10px;
}
.musicTitleName{
  font-family:'Raleway', 'Open Sans', sans-serif;
  font-synthesis: initial;
  font-weight: bold;
}
 .musicTitleImg img{
  width: 100%;
  height: 100%;
  object-fit: fill;
}

</style>
