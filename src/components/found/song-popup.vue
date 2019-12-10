<!--  -->
<template>
<div class=''>
  <div style="margin-top:10px;">
    <div style="margin-left:10px;">
      <font style="font-size: 0.8rem;font-weight: 900;color:#2F4F4F;">歌曲:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</font>
      <font class="van-ellipsis" style="font-size: 1.0rem;font-weight: 900;">{{music.alName}}</font>
      <font style="font-size: 0.8rem;font-weight: 900;color:#2F4F4F;">歌手:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</font>
      <font class="van-ellipsis" style="font-size: 1.0rem;font-weight: 900;">{{music.artist}}</font>
    </div>
      <van-cell @click="down">
        <template #title >
            <div>
             <svg class="iconsvg" aria-hidden="true">
                <use xlink:href="#icon-xiazai"></use>
              </svg>
              <font class="van-ellipsis" style="font-size: 1.0rem;font-weight: 900;margin-left: 5px;">下载</font>
            </div>
        </template>
      </van-cell>
      <van-cell @click="pl">
        <template #title >
            <div >
             <svg class="iconsvg" aria-hidden="true">
                <use xlink:href="#icon-pinglun"></use>
              </svg>
              <font class="van-ellipsis" style="font-size: 1.0rem;font-weight: 900;margin-left: 5px;">评论</font>
            </div>
        </template>
      </van-cell>
      <van-cell @click="geshou">
        <template #title >
            <div >
              <svg class="iconsvg" aria-hidden="true">
                <use xlink:href="#icon-geshou"></use>
              </svg>
              <font class="van-ellipsis" style="font-size: 1.0rem;font-weight: 900;margin-left: 5px;">歌手</font>
            </div>
        </template>
      </van-cell>
      <van-cell @click="openMv">
        <template #title >
            <div >
              <svg class="iconsvg" aria-hidden="true">
                <use xlink:href="#icon-mv"></use>
              </svg>
              <font class="van-ellipsis" style="font-size: 1.0rem;font-weight: 900;margin-left: 5px;">MV</font>
            </div>
        </template>
      </van-cell>
  </div>
</div>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》';
import { Cell, CellGroup, Icon, Toast } from 'vant'
import axios from 'axios'
export default {
// import引入的组件需要注入到对象中才能使用
  components: {
    axios,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [Icon.name]: Icon,
    [Toast.name]: Toast
  },
  props: {
    music_popup: {
      type: Object
    }
  },
  data () {
    // 这里存放数据
    return {
      music: {}

    }
  },
  // 监听属性 类似于data概念
  computed: {},
  // 监控data中的数据变化
  watch: {
    music_popup (newValue) {
      this.music = newValue
    }
  },
  // 方法集合
  methods: {
    down () {
      console.info(this.music)
    },
    pl () {
      // 判断当前是否有音乐正在播放 如果有 隐藏音乐悬浮组件
      // eslint-disable-next-line no-unused-vars
      let isStart = this.$store.state.is.isShowPlayer
      if (isStart === true) {
        this.$store.commit('setIsShowTitle', false)
      }
      this.$router.push({path: `/pl/${this.music.id}`})
    },
    geshou () {
      // 判断当前是否有音乐正在播放 如果有 隐藏音乐悬浮组件
      let isStart = this.$store.state.is.isShowPlayer
      if (isStart === true) {
        this.$store.commit('setIsShowTitle', false)
      }
      axios.get('http://liyangit.top:3000/song/detail?ids=' + this.music.id).then((res) => {
        this.$router.push({path: `/geshou/${res.data.songs[0].ar[0].id}`})
      })
    },
    openMv () {
      // 判断当前是否有音乐正在播放 如果有 隐藏音乐悬浮组件 并且暂停音乐
      let isStart = this.$store.state.is.isShowPlayer
      if (isStart === true) {
        this.$store.commit('setIsShowTitle', false)
        this.$store.commit('setIsStop', false)
      }
      if (this.music.mvId === '0') {
        Toast.fail('该歌曲暂无MV')
        return
      }
      this.$router.push({path: `/mv/${this.music.mvId}`})
    }

  },
  // 生命周期 - 创建完成（可以访问当前this实例）
  created () {
    this.music = this.music_popup
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
      this.$store.commit('setIsShowTitle', true)
    }
  } // 如果页面有keep-alive缓存功能，这个函数会触发

}
</script>
<style  scoped>
/** scoped 表示 样式自在当前组件有效*/
</style>
