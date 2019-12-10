<!--  -->
<template>
<div class=''>
  <div>
    <van-sticky>
      <van-nav-bar :title="title" left-text="返回"  left-arrow @click-left="onClickLeft" />
    </van-sticky>
  </div>
  <div style="margin-bottom: -10px;">
    <van-image width="100%" height="100%" :src="artist.cover"/>
  </div>
  <div>
    <van-tabs v-model="active" sticky>
      <van-tab title="主页">
        <div class="desc" :style="{'margin-bottom': (marginBottom + 50)+ 'px'}">
           <strong>歌手简介</strong>
           <p>{{artist.briefDesc}}</p>
        </div>
        <br>
      </van-tab>
      <van-tab title="歌曲">
        <div class="desc" :style="{'margin-bottom': marginBottom  + 'px'}">
          <strong>热门歌曲</strong>
          <div>
            <van-cell v-for="(gq, i) in songs" :key="gq.index" :label="gq.ar[0].name+' - '+gq.al.name" >
              <template #title >
                <div @click="startMusic(gq)"><font style="color: tan;font-size: 1.2rem;">{{i + 1}}</font><font class="van-ellipsis" style="margin-left: 10px;font-size: 1.0rem;">{{gq.name}}</font></div>
              </template>
              <template #right-icon>
                <van-icon name="bars" class="more" size="35" @click="songde(gq)" style="background-color: white;position: absolute;right: 5px;"/>
              </template>
            </van-cell>
          </div>
          <div style="width: 150px;margin: 0 auto 50px;">
            <van-button round color="linear-gradient(to right, #ff6034, #ee0a24)" type="primary" block @click="loadGq">加载更多歌曲</van-button>
          </div>
          <!-- songde 歌曲详情按钮-->
          <van-popup v-model="showSongde" round position="bottom" :style="{ height: '30%' }" >
              <song-popup :music_popup="music_popup"></song-popup>
          </van-popup>
          </div>
      </van-tab>
      <van-tab title="MV">
      <div class="videoDiv" :style="{'margin-bottom': marginBottom + 'px'}">
        <div  v-for="(item,index) in mvs" :key="index" @click="openMv(item)" class="divK">
          <div class="videoDivImg">
            <img :src="item.imgurl">
          </div>
          <div class="content">
            <div class="van-multi-ellipsis--l2">
              <font>{{item.name}}<br></font>
            </div>
            <span>发布: &nbsp;&nbsp;{{item.publishTime}}&nbsp;&nbsp;&nbsp;播放次数:{{outWan(item.playCount)}}</span>
          </div>
        </div>
      <div style="width: 150px;margin: 0 auto 50px;">
          <van-button round color="linear-gradient(to right, #ff6034, #ee0a24)" type="primary" block @click="loadMv">加载更多歌曲</van-button>
      </div>
      </div>
      </van-tab>
    </van-tabs>
  </div>
</div>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》';
/* eslint-disable */
import { NavBar,Sticky,Image as VanImage,Tab, Tabs,Toast,Cell, CellGroup,Icon,Button,Popup   } from 'vant'
import axios from 'axios'
import playerApi from '@/api/playerApi'
const songPopup = () => import('@/components/found/song-popup')
export default {
// import引入的组件需要注入到对象中才能使用
  components: {
    playerApi,
    songPopup,
    axios,
    [NavBar.name]: NavBar,
    [Sticky.name]: Sticky,
    [VanImage.name]: VanImage,
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    [Toast.name]: Toast,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [Icon.name]: Icon,
    [Button.name]: Button,
    [Popup.name]: Popup 

  },
  data () {
    // 这里存放数据
    return {
      showSongde: false,
      title: '',
      artist: {},
      active:0,
      songs: [],
      mvs:[],
      music_popup:{},
      marginBottom: 20,
      page: 1,
      limit:50
    }
  },
  // 监听属性 类似于data概念
  computed: {

  },
  // 监控data中的数据变化
  watch: {},
  // 方法集合
  methods: {
    // 播放次数转换
  outWan (count) {
      let wan =  count / 10000
      return wan.toFixed(0) + '万'
    },
    onClickLeft () {
      this.$router.go(-1)
    },
    // 播放音乐
    startMusic (gq) {
      let loding = Toast.loading({
        duration: 0,
        message: '加载中...',
        forbidClick: true,
        loadingType: 'spinner',
        // eslint-disable-next-line no-dupe-keys
        forbidClick: true
      })
      let geMusicUrl = 'http://liyangit.top:3000/song/url?id=' + gq.id
      axios.all(
        [
          axios.get(geMusicUrl),
          axios.get('http://liyangit.top:3000/song/detail?ids='+gq.id)
        ]
      ).then(res=>{
        gq.src = res[0].data.data[0].url
        if (gq.src === null) {
          Toast.fail('该音乐已被网易云设置付费可享!')
        }
        // 赋值
        gq.title = gq.name
        gq.artist = gq.ar[0].name
        gq.pic = res[1].data.songs[0].al.picUrl
        // 判断是否正在播放 如果正在播放 不需要重新设置音乐
        document.title = gq.name + '-' + gq.ar[0].name
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
        this.marginBottom = 100
        setTimeout(() => {
          loding.clear()
          playerApi.showPlay()
        }, 2000)
        window.scroll({ top: 0, left: 0, behavior: 'smooth' }) // 滚动到页面最顶部
      })
    },
    // 歌曲详情
    songde (gq) {
       let object = new Object()
      object.id = gq.id
      object.alName = gq.name
      object.artist = gq.ar[0].name
      object.mvId = gq.mv
      this.showSongde = true
      this.music_popup = object

    },
    // 加载更多歌曲
    loadGq () {
      let loding = Toast.loading({
        duration: 0,
        message: '加载歌曲中...',
        loadingType: 'spinner',
        forbidClick: true,
        overlay: true
      })
      let t = this
      let page = t.page + 1
      let gsId = t.$route.params.id
      axios.get('http://liyangit.top:3000/artist/songs?id='+gsId+'&offset=' + (page - 1 ) * t.limit + '&limit='+t.limit).then((res)=>{
        for (let i = 0; i< res.data.songs.length; i++) {
          t.songs.push(res.data.songs[i])
        }
        loding.clear()
      })
    },
    // 加载更多MV
    loadMv () {
      let loding = Toast.loading({
        duration: 0,
        message: '加载MV中...',
        loadingType: 'spinner',
        forbidClick: true,
        overlay: true
      })
      let t = this
      let page = t.page + 1
      let gsId = t.$route.params.id
      axios.get('http://liyangit.top:3000/artist/mv?id='+gsId+'&offset=' + (page - 1 ) * t.limit + '&limit='+t.limit).then((res)=>{
        for (let i = 0; i< res.data.mvs.length; i++) {
          t.mvs.push(res.data.mvs[i])
        }
        loding.clear()
      })
    },
    // 观看MV
    openMv (item) {
            // 判断当前是否有音乐正在播放 如果有 隐藏音乐悬浮组件 并且暂停音乐
      let isStart = this.$store.state.is.isShowPlayer
      if (isStart === true) {
        this.$store.commit('setIsShowTitle', false)
        this.$store.commit('setIsStop', false)
      }
      this.$router.push({path: `/mv/${item.id}`})
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
        message: '加载数据中...',
        loadingType: 'spinner',
        forbidClick: true,
        overlay: true
      })
    let t = this
    let gsId = t.$route.params.id
    let isTitle = this.$store.state.is.isShowTitle
    axios.all(
      [
        axios.get('http://liyangit.top:3000/artist/detail?id='+gsId),
        axios.get('http://liyangit.top:3000/artist/songs?id='+gsId+'&offset=' + (t.page - 1 ) * t.limit + '&limit='+t.limit),
        axios.get('http://liyangit.top:3000/artist/mv?id='+gsId+'&offset=' + (t.page - 1 ) * t.limit + '&limit='+t.limit)
      ]
    ).then(res=>{
      t.title = res[0].data.data.artist.name
      t.artist = res[0].data.data.artist
      document.title = res[0].data.data.artist.name
      t.songs = res[1].data.songs
      t.mvs = res[2].data.mvs
      setTimeout(()=>{
        loding.clear()
      },1000)
    })
  } // 如果页面有keep-alive缓存功能，这个函数会触发
}
</script>
<style scoped>
/** scoped 表示 样式自在当前组件有效*/
.desc{
  padding: 5px 10px;
}
.desc strong{
  font-size: 1.1rem;
}
.desc p{
  font-size: 15px;
  font-family: fantasy;
  color:rgba(19, 17, 17, 0.466);
}
.videoDiv{
  padding: 5px;
}
.divK{
  padding: 5px 0px;
  -webkit-transition: all 0.2s linear;
  transition: all 0.2s linear;
}
.divK:hover{
box-shadow: 0px 0px 10px 2px rgb(97, 95, 95);
color:rgb(238, 141, 141);
}
.divK:active{
box-shadow: 0px 0px 10px 2px rgb(97, 95, 95);
color:rgb(238, 141, 141);
}
.videoDivImg{
    width: 100px;
    height: 60px;
    float: left;
}
.videoDivImg img{
  width: 100%;
  height: 100%;
  object-fit: cover;
}
 .content {
  margin-left: 110px;
  width: 65%;
  height: 60px;
}
.content font{
  font-size: 0.9rem;
  font-family:'Raleway', 'Open Sans', sans-serif;
  font-synthesis: initial;
  font-weight: bold;
}
.content span{
  font-family:'Raleway', 'Open Sans', sans-serif;
  font-synthesis: initial;
  font-weight: bold;
  color: rgba(69, 90, 100, 0.6);
  font-size: 14px;
}
</style>
