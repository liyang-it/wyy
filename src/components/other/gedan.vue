<!--  -->
<template>
<div class='' >
  <van-sticky :offset-top="0">
    <van-nav-bar title="歌单" left-text="返回" left-arrow @click-left="$router.go(-1)"/>
  </van-sticky>
  <div v-show="loadContent">
    <div class="imgDiv" >
      <img :src="backgroundImg2" alt="">
    </div>
    <div class="sltDiv">
      <div class="slt">
        <img :src="backgroundImg" alt="">
      </div>
      <div class="content">
        <span>{{gdName}}</span>
         <p>{{desc}}</p>
      </div>
    </div>
    <div class="musics" >
        <van-cell v-for="(s1, si1) in gqs" :key="si1" :label="s1.al.name+' - '+s1.ar[0].name" >
            <template #title >
              <div @click="startMusic(s1)">
                <font style="color: tan;font-size: 1.2rem;">{{si1 + 1}}</font>
                <font class="van-ellipsis" style="margin-left: 10px;font-size: 1.0rem;font-weight: bold;" id="gqTitle">{{s1.name}}</font>
              </div>
            </template>
            <template #right-icon>
                <van-icon name="bars" class="more" size="35"  style="background-color: white;position: absolute;right: 5px;" @click="songde(s1)"/>
            </template>
          </van-cell>
          <div style="width: 100%;margin: auto;margin-top: 10px;color: rgba(69, 90, 100, 0.6);margin-bottom: 10px;text-align: center;" @click="loadGq" >
            加载更多<van-icon name="search" size="20" style="top: 4px;" />
          </div>
    </div>
  </div>
  <!-- songde 歌曲详情按钮-->
  <div id="popup_id">
    <van-popup v-model="showSongde" round position="bottom" :style="{ height: '30%' }" >
      <song-popup :music_popup="music_popup"></song-popup>
    </van-popup>
  </div>

  <div v-show="loadText">
    <h3>加载中...</h3>
  </div>
</div>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》';
/* eslint-disable */
import axios from 'axios'
import playerApi from '@/api/playerApi'
import {Sticky,NavBar,Icon,Toast,Cell, CellGroup,Popup,Dialog} from 'vant'
const songPopup = () => import('@/components/found/song-popup')
export default {
  //import引入的组件需要注入到对象中才能使用
  components: {
    songPopup,
    playerApi,
    [Sticky.name]: Sticky,
    [NavBar.name]: NavBar,
    [Icon.name]: Icon,
    [Toast.name]: Toast,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [Popup.name]: Popup,
    [Dialog.name]:Dialog 
  },
  data () {
    // 这里存放数据
    return {
      backgroundImg:'',
      backgroundImg2:'',
      gdName: '',
      desc: '',
      gqIds: [],
      gqs: [],
      loadContent: false,
      loadText: true,
      marginBottom: 50,
      showSongde:false,
      music_popup:{},
      trackIds:[],
      trackIdsLength: 0,
      page: 30
    }
  },
  // 监听属性 类似于data概念
  computed: {},
  // 监控data中的数据变化
  watch: {},
  // 方法集合
  methods: {
    // 播放歌曲
    startMusic (gq) {
      let object = new Object()
      object.id = gq.id
      object.title = gq.name
      object.artist = gq.ar[0].name
      object.pls = gq.pls
      document.title = object.title + '-' + object.artist
      // 请求获取歌曲封面
      axios.get('http://liyangit.top:3000/song/detail?ids='+object.id).then((res)=>{
        object.pic = res.data.songs[0].al.picUrl
        this.toStartMusic(object,this)
      })  
    },
    toStartMusic (gq,t) {
      let loding = Toast.loading({
        duration: 0,
        message: '加载中...',
        forbidClick: true,
        loadingType: 'spinner',
        forbidClick: true
      })
        if (gq.src === null) {
          Toast.fail('该音乐已被网易云设置付费可享!')
        }
        // 判断是否正在播放 如果正在播放 不需要重新设置音乐
        let isStart = t.$store.state.musicStatus.isStart
        if (isStart === t) {
          t.$store.commit('setMusic', gq)
        } else {
          // 判断 播放是否为同一首歌曲 如果是 继续播放 不用重置音乐
          let gqid = t.$store.state.music.id
          if (gqid !== gq.id) {
            t.$store.commit('setMusic', gq)
          }
        }
        console.info(gq)
        // t.editMarginBottom()
        t.marginBottom = 160
        setTimeout(() => {
          loding.clear()
          playerApi.showPlay()
        }, 2000)
    },
    // 加载歌曲
    loadGq () {
      let loding = Toast.loading({
        duration: 0,
        message: '加载数据中...',
        forbidClick: true,
        loadingType: 'spinner',
        forbidClick: true
      })
      let page = this.page
      let limit = this.page + 100
      if(page > this.trackIds.length){
        loding.clear()
        Dialog.alert({
          title: '提示',
          message: '已加载到底部',
          theme: 'round-button',
          }).then(() => {})
        return
      }
      let array = this.trackIds.slice(page,limit)
      for (let i = 0;i< array.length;i++) {
        let gqId = array[i].id
        axios.all(
          [
            axios.get('http://liyangit.top:3000/song/detail?ids='+ gqId),
            axios.get('http://liyangit.top:3000/song/url?id='+gqId),
            axios.get('https://www.liyangit.top:9443/comment/hot?id='+gqId+'&type=0&limit=50')
          ]
        ).then(res=>{
          let object = new Object()
          object = res[0].data.songs[0]
          object.url = res[1].data.data[0].url
          object.pls = res[2].data.hotComments
          this.gqs.push(object)
          setTimeout(()=>{
            this.loadContent = true
            this.loadText = false
            loding.clear()
          },1000)
        })
      }
      this.page = limit

    },
    // 打开音乐操作组件
    songde (gq){
      this.showSongde = true
      let object = new Object()
      object.id = gq.id
      object.mvId = gq.mv
      object.alName = gq.name
      object.artist = gq.ar[0].name
      this.music_popup = object
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
        message: '加载歌单数据中...',
        forbidClick: true,
        loadingType: 'spinner',
        forbidClick: true
      })
    let t = this 
    let id = t.$route.params.id
    let isStart = this.$store.state.is.isShowPlayer
    if (isStart) {
      this.$store.commit('setIsShowTitle', true)
      // this.$store.commit('setIsStop', false)
    }
    t.loadContent = false
    t.loadText = true
    axios.get('http://liyangit.top:3000/playlist/detail?id='+id).then((res=>{
      t.backgroundImg = res.data.playlist.coverImgUrl
      // t.backgroundImg2 = res.data.playlist.creator.backgroundUrl // 使用歌单创建者了背景当做歌单背景
      t.backgroundImg2 = res.data.playlist.tracks[0].al.picUrl // 使用歌单中第一手歌曲专辑图当做歌单背景
      t.gdName = res.data.playlist.name
      t.desc = res.data.playlist.description
      t.trackIds = res.data.playlist.trackIds
      t.trackIdsLength = res.data.playlist.trackIds.length
      for(let i = 0;i< t.page; i++){
        // 歌曲 id: res.data.playlist.trackIds[i].id
        // 拿到ID 获取歌曲详情,在获取 歌曲URL
        let gqId = res.data.playlist.trackIds[i].id
        axios.all(
          [
            axios.get('http://liyangit.top:3000/song/detail?ids='+ gqId),
            axios.get('http://liyangit.top:3000/song/url?id='+gqId),
            axios.get('https://www.liyangit.top:9443/comment/hot?id='+gqId+'&type=0&limit=50')
          ]
        ).then(res=>{
          let object = new Object()
          object = res[0].data.songs[0]
          object.url = res[1].data.data[0].url
          object.pls = res[2].data.hotComments
          t.gqs.push(object)
          setTimeout(()=>{
            t.loadContent = true
            t.loadText = false
            loding.clear()
          },1000)
        })
      }
    }))

  } // 如果页面有keep-alive缓存功能，这个函数会触发
}
</script>
<style lang="scss" scoped>
/** scoped 表示 样式自在当前组件有效*/
@media(min-width: 768px){
  #popup_id{
    .van-popup--bottom {
    bottom: 0;
    left: 0;
    right:0;
    margin: 0 auto;
    width: 768px;
    }
  }

}
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
  /**超出 特定宽度文本 换行 */
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
  position: relative;
  top: 15px;
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
