<!--  -->
<template>
<div class=''>
      <van-swipe :loop="true" :autoplay="5000" style="margin-left: 35px;height: 130px;margin-top: 5px;" @change="onChange2">
      <van-swipe-item >
        <div style="width: 100%;height: 160px;" id="hover_">
            <div style="margin-bottom: 20px;" v-for="(item1,index1) in newSong1" :key="index1" @click="startMusicTO(item1)" >
              <img :src="item1.picUrl" style="width: 35px;height: 35px;border-radius:8px;" />
              <div style="margin-left: 50px; margin-top: -35px;">
                    <font style="font-size: 14px;">{{item1.song.name.length >=15 ? item1.song.name.substring(0,25):item1.song.name }}</font>&nbsp;&nbsp;-&nbsp;&nbsp;<font style="color: burlywood;font-size: 10px;">{{item1.song.artists[0].name}}</font>
              </div>
            </div>
        </div>
    </van-swipe-item>
    <van-swipe-item>
        <div style="width: 100%;height: 160px;" id="hover_">
            <div style="margin-bottom: 20px;" v-for="(item2,index2) in newSong2" :key="index2" @click="startMusicTO(item2)" >
              <img :src="item2.picUrl" style="width: 35px;height: 35px;border-radius:8px;" />
              <div style="margin-left: 50px; margin-top: -35px;">
                    <font style="font-size: 14px;">{{item2.song.name.length >=15 ? item2.song.name.substring(0,25):item2.song.name }}</font>&nbsp;&nbsp;-&nbsp;&nbsp;<font style="color: burlywood;font-size: 10px;">{{item2.song.artists[0].name}}</font>
              </div>
            </div>
        </div>
    </van-swipe-item>
    <van-swipe-item>
        <div style="width: 100%;height: 160px;" id="hover_">
            <div style="margin-bottom: 20px;" v-for="(item3,index3) in newSong3" :key="index3" @click="startMusicTO(item3)" >
              <img :src="item3.picUrl" style="width: 35px;height: 35px;border-radius:8px;" />
              <div style="margin-left: 50px; margin-top: -35px;">
                    <font style="font-size: 14px;">{{item3.song.name.length >=15 ? item3.song.name.substring(0,25):item3.song.name }}</font>&nbsp;&nbsp;-&nbsp;&nbsp;<font style="color: burlywood;font-size: 10px;">{{item3.song.artists[0].name}}</font>
              </div>
            </div>
        </div>
    </van-swipe-item>
    <template #indicator>
      <div class="custom-indicator newsong_lbText">
        当前 :{{ current }}
      </div>
  </template>
  </van-swipe>
</div>
</template>
<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》';
import playerApi from '@/api/playerApi'
import axios from 'axios'
import { Swipe, SwipeItem, Toast } from 'vant'
export default {
// import引入的组件需要注入到对象中才能使用
  components: {
    playerApi,
    axios,
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem,
    [Toast.name]: Toast
  },
  data () {
    // 这里存放数据
    return {
      newSong1: [],
      newSong2: [],
      newSong3: [],
      current: 1

    }
  },
  // 监听属性 类似于data概念
  computed: {},
  // 监控data中的数据变化
  watch: {},
  // 方法集合
  methods: {
    //
    startMusicTO (gq) {
      let loding = Toast.loading({
        duration: 0,
        message: '加载中...',
        forbidClick: true,
        loadingType: 'spinner',
        // eslint-disable-next-line no-dupe-keys
        forbidClick: true
      })
      let geMusicUrl = 'http://liyangit.top:3000/song/url?id=' + gq.id
      axios.get(geMusicUrl).then((res) => {
        gq.src = res.data.data[0].url
        if (gq.src === null) {
          Toast.fail('该音乐已被网易云设置付费可享!')
        }
        // 赋值
        gq.title = gq.name
        gq.artist = gq.song.artists[0].name
        gq.pic = gq.picUrl
        // 判断是否正在播放 如果正在播放 不需要重新设置音乐
        document.title = gq.name + '-' + gq.song.artists[0].name
        let isStart = this.$store.state.musicStatus.isStart
        if (isStart === false) {
          this.$store.commit('setMusic', gq)
        } else {
          // 判断 播放是否为同一首歌曲 如果是 继续播放 不用重置音乐
          let gqid = this.$store.state.music.id
          if (gqid !== gq.id) {
            this.$store.commit('setMusic', gq)
          }
        }
        this.editMarginBottom()
        setTimeout(() => {
          loding.clear()
          playerApi.showPlay()
        }, 2000)
        // eslint-disable-next-line no-unused-vars
        let t = document.body.clientHeight // 获取页面最大高度 window.scroll({ top: t, left: 0, behavior: 'smooth' }) 滚动到页面最底部
        window.scroll({ top: 0, left: 0, behavior: 'smooth' }) // 滚动到页面最顶部
      })
    },
    onChange2 (index) {
      this.current = index
    },
    editMarginBottom () {
      this.$emit('editMarginBottom')
    }
  },
  // 生命周期 - 创建完成（可以访问当前this实例）
  created () {
    // http://47.99.165.122:3000/personalized/newsong
    axios.get('http://www.liyangit.top:3000/personalized/newsong').then((res) => {
      this.newSong1 = res.data.result.slice(0, 3)
      this.newSong2 = res.data.result.slice(3, 6)
      this.newSong3 = res.data.result.slice(6, 9)
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

  } // 如果页面有keep-alive缓存功能，这个函数会触发
}
</script>
<style  scoped>
/** scoped 表示 样式自在当前组件有效*/
 .newsong_lbText{
   top: 90px;
   height: 20px;
 }
</style>
