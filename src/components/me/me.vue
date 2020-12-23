<!--  -->
<template>
<div class=''>
 <div class="head">
   <div class="head_bg">
     <img src="../../assets/wyy1.jpg" alt="">
     <div class="head_bg_title"><span>不满足是向上的齿轮。</span></div>
     <div class="head_bg_author"><span>--鲁迅</span></div>
   </div>
   <div class="head_content">
     你好啊
   </div>
 </div>
  <div class="content">
  <van-cell  value="前往" @click="toUrl('https://github.com/liyang-it/wyy')">
      <template #title >
        <div>
          <span class="custom-title" style="font-size: 15px;font-weight: bold;">GitHub地址</span>
          <img alt="GitHub Repo stars" style="position: relative;top: 5px;" src="https://img.shields.io/github/stars/liyang-it/wyy?style=social">
        </div>
      </template>
  </van-cell>
  <van-cell  value="前往" @click="toWeichat">
      <template #title >
        <div>
          <span class="custom-title" style="font-size: 15px;font-weight: bold;">微信小程序版</span>
        </div>
      </template>
  </van-cell>
 </div>
  <div class="gy">
    <span>此小程序仅供学习，所有资源来自互联网，音乐版权归唱片公司所有，如有侵权请联系删除 1922802352@qq.com</span>
  </div>
</div>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》';
/* eslint-disable */
import {Skeleton,Cell, CellGroup,Icon,Toast,Dialog } from 'vant'
export default {
// import引入的组件需要注入到对象中才能使用
  components: {
    [Skeleton.name]:Skeleton,
    [Cell.name]: Cell,
    [CellGroup.name]:CellGroup,
    [Icon.name]:Icon,
    [Toast.name]:Toast,
    [Dialog.name]: Dialog
  },
  data () {
    // 这里存放数据
    return {
      loading: true
    }
  },
  // 监听属性 类似于data概念
  computed: {},
  // 监控data中的数据变化
  watch: {},
  // 方法集合
  methods: {
    toUrl(url){
      window.location.href = url
    },
    toWeichat () {
      this.$dialog.alert(
        {
            title: '微信小程序',
            message: '<img src="http://www.file.liyangit.top/wyy/scan.png" style="width: 100%;height: 100%;"/>',
            theme: 'round-button',
        }
      )
    }

  },
  // 生命周期 - 创建完成（可以访问当前this实例）
  created () {
      let loding = Toast.loading({
        duration: 0,
        message: '请求中...',
        forbidClick: true,
        loadingType: 'spinner',
        forbidClick: true
      })
      setTimeout(()=>{
        this.loading = false
        loding.clear()
      },2000)
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
  margin-top: 0px;
}
.head_bg{
  height: 100%;
  width: 100%;
}
.head_bg img{
  width: 100%;
  height: 100%;
}
.head_content{
    position: relative;
    bottom: 90px;
    background-color: rgb(134, 129, 129);
    color: white;
    width: 90%;
    margin: 0 auto;
    height: 100px;
    border-radius: 10px;
    display: none;
}
.content{
    margin-top: -10px;
    border-radius: 10px;
    overflow: auto;
}
.head_bg_title {
    position: relative;
    top: -90px;
    left: 130px;
}
.head_bg_author {
    position: relative;
    top: -80px;
    left: 300px;
}
.head_bg_author span{
  color: #ffffff;
  font-family: 'Long Cang',cursive;
  letter-spacing: .01rem;
  text-shadow: 0 3px 6px rgba(0,0,0,.5);
  
}
.head_bg_title span{
  color: #ffffff;
  font-family: 'Long Cang',cursive;
  letter-spacing: .01rem;
  text-shadow: 0 3px 6px rgba(0,0,0,.5);
  font-size: 19px;

}
.van-cell__title :hover{
  color: red;
}
.gy{
  font-size: 12px;
  text-align: center;
  color: #B3B3B3;
}
@media(min-width: 668px){
.head{
  height: 350px;
  border: 1px solid pink;
}
.head_bg img{
object-fit: cover;
}
.head_bg_title {
    width: 192px;
    left: 510px;
}
.head_bg_author {
    width: 50px;
    left: 680px;
}

}
</style>
