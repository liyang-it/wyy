<!--  -->
<template>
<div class=''>
  <!-- :style="{'margin-bottom': bottom+'px'}" -->
  <div class="rk" :style="{'margin-bottom': bottom+'px'}">
    <div class="rk_list" v-for="(item,index) in rks" :key="index" @click="openGd(item)">
      <div class="rk_list_img">
        <img :src="item.coverImgUrl">
      </div>
      <div class="rk_list_content">
        <div v-if="showTracks(item)">
          <p  v-for="(item2,index2) in item.tracks" :key="index2">{{item2.first}} - {{item2.second}}</p>
        </div>
        <div v-else class="rk_list_content_desc">
          <font>{{item.name}}</font>
          <p>{{item.updateFrequency}}</p>
        </div>
      </div>
    </div>
  </div>
  <br>
</div>
</template>
<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》';
/* eslint-disable */
import axios from 'axios'
export default {
// import引入的组件需要注入到对象中才能使用
  components: {
    axios
  },
  data () {
    // 这里存放数据
    return {
      rks: [],
      bottom: 30
    }
  },
  // 监听属性 类似于data概念
  computed: {

  },
  // 监控data中的数据变化
  watch: {},
  // 方法集合
  methods: {
    showTracks (e) {
      let isTrue = false
      if(e.tracks.length !== 0){
        isTrue = true
      }
      return isTrue
    },
    openGd(gd){
      console.info(gd)
      this.$router.push({path:`/gedan/${gd.id}`})
    }
  },
  // 生命周期 - 创建完成（可以访问当前this实例）
  created () {
    axios.get('http://liyangit.top:3000/toplist/detail').then((res) => {
      console.info(res.data.list)
      this.rks = res.data.list
    })
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
    let isStart = this.$store.state.is.isShowPlayer
    if (isStart === true) {
        this.bottom = 130
    }
  } // 如果页面有keep-alive缓存功能，这个函数会触发
}
</script>
<style  scoped>
/** scoped 表示 样式自在当前组件有效*/
.rk{
  padding: 10px;
  position: relative;
}
.rk_list{
  padding: 5px 0px;
  transition: all 0.2s linear;
  -webkit-transition: all 0.2s linear;
}
.rk_list:hover{
  
  box-shadow: 0px 0px 10px 2px rgb(97, 95, 95);
  color:rgb(238, 141, 141);
}
.rk_list:active{
  
  box-shadow: 0px 0px 10px 2px rgb(97, 95, 95);
  color:rgb(238, 141, 141);
}
.rk_list .rk_list_img{
  width:100px;
  height: 100px;
}
.rk_list_content_desc{
  margin-top: 10px;
}
.rk_list .rk_list_content{
    margin-left: 120px;
    margin-top: -100px;
    position: absolute;
}
.rk_list_content p{
  font-size: 12px;
  font-weight: bold;
}
.rk_list_content font{
  font-size: 16px;
  font-weight: bold;
}
.rk_list_img img{
  width:100%;
  height: 100%;
}
</style>
