<!--  -->
<template>
<div class=''>
  <!-- <div id="dv"></div> -->
  <div>
    <van-row>
      <van-col span="12">span: 12</van-col>
      <van-col span="12">span: 12</van-col>
    </van-row>
  </div>
</div>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）

// 例如：import 《组件名称》 from '《组件路径》';
/* eslint-disable */
import {Col, Row} from 'vant'
import axios from 'axios'
const songPopup = () => import('@/components/found/song-popup')
export default {
// import引入的组件需要注入到对象中才能使用
  components: {
    axios,
    songPopup,
    [Col.name]:Col,
    [Row.name]:Row
  },
  data () {
    // 这里存放数据
    return {

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
    var dv = document.getElementById('dv');
    var x = 0;
    var y = 0;
    var l = 0;
    var t = 0;
    var isDown = false;
    //鼠标按下事件
dv.onmousedown = function(e) {
    //获取x坐标和y坐标
    x = e.clientX;
    y = e.clientY;

    //获取左部和顶部的偏移量
    l = dv.offsetLeft;
    t = dv.offsetTop;
    //开关打开
    isDown = true;
    //设置样式  
    dv.style.cursor = 'move';
}
//鼠标移动
window.onmousemove = function(e) {
    if (isDown == false) {
        return;
    }
    //获取x和y
    var nx = e.clientX;
    var ny = e.clientY;
    //计算移动后的左偏移量和顶部的偏移量
    var nl = nx - (x - l);
    var nt = ny - (y - t);

    dv.style.left = nl + 'px';
    dv.style.top = nt + 'px';
}
//鼠标抬起事件
dv.onmouseup = function() {
    //开关关闭
    isDown = false;
    dv.style.cursor = 'default';
}
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
 #dv {
	width: 100px;
	height:100px;
	background-color:blue;
	border-radius:50%;
	position:absolute;
}
</style>
