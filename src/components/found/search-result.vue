<!--  -->
<template>
<div class=''>
  <div style="margin-bottom: -10px;">
    <van-sticky :offset-top="0">
        <van-nav-bar title="搜索结果" left-text="返回" left-arrow @click-left="$router.back(-1)"/>
            <van-search v-model="searchText" show-action placeholder="请输入搜索关键词" >
              <template #action>
                  <div>
                    <van-icon size="32" name="search" @click="search"/>
                  </div>
              </template>
            </van-search>
     </van-sticky>
  </div>
          <!-- songde 歌曲详情按钮-->
          <van-popup v-model="showSongde" round position="bottom" :style="{ height: '30%' }" >
             <song-popup :music_popup="music_popup"></song-popup>
          </van-popup>
  <div>
    <van-tabs v-model="active" sticky animated>
      <van-tab title="综合"  :style="{'margin-bottom': marginBottom+'px'}">
        <div class="resultDiv">
          <div class="gxq" id="gxq" v-show="showArtist">
            <p>你可能感兴趣</p>
            <!--歌手列表-->
            <van-cell v-for="(t1, i1) in artists" :key="i1" @click="openGs(t1)">
              <template #title >
                <div >
                  <van-image round width="2.5rem" height="2.5rem" :src="t1.picUrl" fit="fill"/>
                  <font style="font-size: 0.9rem;position: absolute;margin-left: 10px;margin-top: 8px;font-weight: bold;">歌手:&nbsp;</font>
                  <font style="font-size: 1.1rem;position: absolute;margin-left: 50px;margin-top: 8px;color: #4994df;font-weight: bold;">{{t1.name}}</font>
                </div>
              </template>
          </van-cell>
          <div style="width: 100%;margin: auto;margin-top: 10px;color: rgba(69, 90, 100, 0.6);margin-bottom: 10px;text-align: center;" @click="active = 3" >
            {{artistText}}<van-icon name="arrow" size="20" style="top: 4px;"/>
          </div>
          </div>
          <!--综合单曲 列表-->
          <div class="qt" v-show="showSong">
            <p>单曲</p>
            <van-cell v-for="(t2, i2) in songs" :key="i2" :label=" t2.al.name+' - '+ t2.ar[0].name" >
            <template #title >
             <div @click="startMusic(t2)">
               <!-- <font style="color: tan;font-size: 1.2rem;">{{i2 + 1}}</font> -->
               <font class="van-ellipsis" style="margin-left: 10px;font-size: 1.0rem;color: #4994df;font-weight: bold;" id="gqTitle">{{t2.name}}</font>
            </div>
            </template>
            <template #right-icon>
                <van-icon name="bars" class="more" size="35"  style="background-color: white;position: absolute;right: 5px;" @click="openSong(t2)"/>
            </template>
          </van-cell>
          <div style="width: 100%;margin: auto;margin-top: 10px;color: rgba(69, 90, 100, 0.6);margin-bottom: 10px;text-align: center;" @click="active = 1" >
            {{songText}}<van-icon name="arrow" size="20" style="top: 4px;"/>
          </div>
          </div>
          <!--综合 歌单 列表-->
          <div class="qt" id="gd" v-show="showPlayList">
            <p>歌单</p>
          <div  v-for="(t3, i3) in playLists" :key="i3" class="divK" @click="openGd(t3)">
          <div class="videoDivImg">
            <img :src="t3.coverImgUrl">
          </div>
          <div class="content">
            <div class="van-multi-ellipsis--l2">
              <font>{{t3.name}}<br></font>
            </div>
            <span>{{geText(t3)}}</span>
          </div>
        </div>
          <div style="width: 100%;margin: auto;margin-top: 10px;color: rgba(69, 90, 100, 0.6);margin-bottom: 10px;text-align: center;" @click="active = 2">
            {{playListText}}<van-icon name="arrow" size="20" style="top: 4px;"/>
          </div>
          </div>
          <!--综合 视频 列表-->
          <div class="qt" id="mv" v-show="showVideo">
            <p>视频</p>
          <div  v-for="(t4, i4) in videos" :key="i4" class="divK" @click="openSp(t4)">
          <div class="videoDivImg">
            <img :src="t4.coverUrl">
          </div>
          <div class="content">
            <div class="van-multi-ellipsis--l2">
              <font>{{t4.title}}<br></font>
            </div>
          </div>
        </div>
        <div style="width: 100%;margin: auto;margin-top: 10px;color: rgba(69, 90, 100, 0.6);margin-bottom: 10px;text-align: center;" @click="active = 4">
            {{videoText}}<van-icon name="arrow" size="20" style="top: 4px;"/>
          </div>
          </div>
        </div>
      </van-tab>

      <!-- 单曲界面   -->
      <van-tab title="单曲" :style="{'margin-bottom': marginBottom+'px'}">
        <div >
          <strong style="margin-left: 15px;">搜索到相关歌曲:&nbsp;&nbsp;{{gqCount}}首</strong>
          <van-cell v-for="(s1, si1) in songs2" :key="si1" :label="s1.name +' - '+ s1.artists[0].name" >
            <template #title >
              <div @click="startMusic2(s1)">
                <font style="color: tan;font-size: 1.2rem;">{{si1 + 1}}</font>
                <font class="van-ellipsis" style="margin-left: 10px;font-size: 1.0rem;color: #4994df;font-weight: bold;" id="gqTitle">{{s1.name}}</font>
              </div>
            </template>
            <template #right-icon>
                <van-icon name="bars" class="more" size="35"  style="background-color: white;position: absolute;right: 5px;" @click="openSong2(s1)"/>
            </template>
          </van-cell>
          <div style="width: 100%;margin: auto;margin-top: 10px;color: rgba(69, 90, 100, 0.6);margin-bottom: 10px;text-align: center;"  @click="loadGq">
            加载更多<van-icon name="search" size="20" style="top: 4px;" />
          </div>
        </div>
      </van-tab>
      <!-- 歌单  界面   -->
      <van-tab title="歌单" :style="{'margin-bottom': marginBottom+'px'}">
        <div>
          <strong style="margin-left: 15px;">搜索到相关歌单:&nbsp;&nbsp;{{gdCount}}张</strong>
          <div  v-for="(p1, pi1) in playLists2" :key="pi1" class="divK" @click="openGd(p1)">
          <div class="videoDivImg">
            <img :src="p1.coverImgUrl">
          </div>
          <div class="content">
            <div class="van-multi-ellipsis--l2">
              <font>{{p1.name}}<br></font>
            </div>
            <span>{{geText(p1)}}</span>
          </div>
        </div>
          <div style="width: 100%;margin: auto;margin-top: 10px;color: rgba(69, 90, 100, 0.6);margin-bottom: 10px;text-align: center;" @click="loadGd" >
            加载更多<van-icon name="search" size="20" style="top: 4px;"/>
          </div>
        </div>
      </van-tab>
      <!-- 歌手   界面   -->
      <van-tab title="歌手" :style="{'margin-bottom': marginBottom+'px'}">
        <div>
          <strong style="margin-left: 15px;">搜索到相关歌手:&nbsp;&nbsp;{{gsCount}}位</strong>
          <van-cell v-for="(a1, ai1) in artists2" :key="ai1" @click="openGs(a1)">
              <template #title >
                <div >
                  <van-image round width="2.5rem" height="2.5rem" :src="a1.img1v1Url" fit="fill"/>
                  <font style="font-size: 0.9rem;position: absolute;margin-left: 10px;margin-top: 8px;font-weight: bold;">歌手:&nbsp;</font>
                  <font style="font-size: 1.1rem;position: absolute;margin-left: 50px;margin-top: 8px;color: #4994df;font-weight: bold;" id="gqTitle">{{a1.name}}</font>
                </div>
              </template>
          </van-cell>
          <div style="width: 100%;margin: auto;margin-top: 10px;color: rgba(69, 90, 100, 0.6);margin-bottom: 10px;text-align: center;" @click="loadGs">
            加载更多<van-icon name="search" size="20" style="top: 4px;"/>
        </div>
        </div>
      </van-tab>
      <!-- 视频   界面   -->
      <van-tab title="视频"  :style="{'margin-bottom': marginBottom+'px'}">
        <div>
          <strong style="margin-left: 15px;">搜索到相关视频:&nbsp;&nbsp;{{spCount}}条</strong>
          <div  v-for="(v1, vi1) in videos2" :key="vi1" class="divK" @click="openSp(v1)">
          <div class="videoDivImg">
            <img :src="v1.coverUrl">
          </div>
          <div class="content">
            <div class="van-multi-ellipsis--l2">
              <font>{{v1.title}}<br></font>
              <span>视频来自:&nbsp;&nbsp;{{v1.creator[0].userName}}</span>
            </div>
          </div>
        </div>
        <div style="width: 100%;margin: auto;margin-top: 10px;color: rgba(69, 90, 100, 0.6);margin-bottom: 10px;text-align: center;" @click="active = 4">
            加载更多<van-icon name="search" size="20" style="top: 4px;"/>
        </div>
        </div>
      </van-tab>
      <!-- 操作组件调用-->
    </van-tabs>
  </div>
</div>
</template>
<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》';
/* eslint-disable */
import { Toast, Search, Sticky, Tabbar, TabbarItem, Icon, Cell, CellGroup,NavBar,Tab, Tabs,Image as VanImage, Button,Popup } from 'vant'
import axios from 'axios'
import playerApi from '@/api/playerApi'
const songPopup = () => import('@/components/found/song-popup')
export default {
// import引入的组件需要注入到对象中才能使用
  components: {
    playerApi,
    songPopup,
    axios,
    [Toast.name]: Toast,
    [Search.name]: Search,
    [Sticky.name]: Sticky,
    [Tabbar.name]: Tabbar,
    [TabbarItem.name]: TabbarItem,
    [Icon.name]: Icon,
    [Cell.name]: Cell,
    [CellGroup.name]: Toast,
    [NavBar.name]: NavBar,
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    [VanImage.name]: VanImage,
    [Button.name]: Button,
    [Popup.name]: Popup
  },
  data () {
    // 这里存放数据
    return {
      searchText: '',
      active: 0,
      limit: 50,
      result: [],
      showArtist: false,
      artists:[],
      artists2:[],
      artistText :' 换一个搜索词试试呗',
      songs:[],
      songs2:[],
      showSong: false,
      songText :'换一个搜索词试试呗',
      playLists:[],
      playLists2:[],
      showPlayList: false,
      playListText :'换一个搜索词试试呗',
      showVideo: false,
      videos:[],
      videos2:[],
      videoText :'换一个搜索词试试呗',
      marginBottom: 60,
      gqPage: 1,
      gdPage: 1,
      gsPage: 1,
      spPage: 1,
      gqCount:0,
      gdCount:0,
      gsCount:0,
      spCount:0,
      showSongde: false,
      music_popup:{}
    }
  },
  // 监听属性 类似于data概念
  computed: {},
  // 监控data中的数据变化
  watch: {},
  // 方法集合
  methods: {
    // 计算视频显示文字
    geText (g) {
      let str = g.trackCount + '首音乐,  by '+g.creator.nickname+',  播放 '+ g.playCount+' 次'
      return str
    },
    // 打开音乐操作 组件
    openSong (gq) {
      this.showSongde = true
      this.music_popup.alName = gq.name
      this.music_popup.artist = gq.ar[0].name
      this.music_popup.id = gq.id
      this.music_popup.mvId = gq.mv
    },
    openSong2 (gq) {
      this.showSongde = true
      this.music_popup.alName = gq.name
      this.music_popup.artist = gq.artists[0].name
      this.music_popup.id = gq.id
      this.music_popup.mvId = gq.mvid
    },
    // 播放音乐
    startMusic (gq) {
      let object = new Object()
      object.id = gq.id
      object.title = gq.name
      object.artist = gq.ar[0].name
      object.pic = gq.al.picUrl
      document.title = object.title + '-' + object.artist
      this.toStartMusic(object,this)
    },
    startMusic2 (gq) {
      let object = new Object()
      object.id = gq.id
      object.title = gq.name
      object.artist = gq.artists[0].name
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
      let geMusicUrl = 'http://liyangit.top:3000/song/url?id=' + gq.id
      axios.get(geMusicUrl).then((res) => {
        gq.src = res.data.data[0].url
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
        // t.editMarginBottom()
        t.marginBottom = 160
        setTimeout(() => {
          loding.clear()
          playerApi.showPlay()
        }, 2000)
      })
    },
    // 打开歌手界面
    openGs (gs) {
      this.$router.push(
        {
          path: `/geshou/${gs.id}`
        }
        )
    },
    // 打开歌单界面
    openGd (gd){
      this.$router.push(
        {
          path: `/gedan/${gd.id}`
        }
      )
    },
    // 打开视频界面
    openSp(sp){
      let isStart = this.$store.state.is.isShowPlayer
      if (isStart === true) {
        this.$store.commit('setIsShowTitle', false)
        this.$store.commit('setIsStop', false)
      }
      this.$router.push(
        {
          path: `/video/${sp.vid}`
        }
      )
    },
    // 查询
    search () {
      let t = this
      t.active = t.active
      t.loadData(t)
    },
    // 加载更多歌曲
    loadGq () {
      let loding = Toast.loading({
        duration: 0,
        message: '加载歌曲中...',
        forbidClick: true,
        loadingType: 'spinner',
        forbidClick: true
      })
      this.gqPage = this.gqPage + 1
      let page = (this.gqPage - 1) * this.limit
      axios.get('http://liyangit.top:3000/search?keywords='+this.searchText+'&type=1&offset='+page+'&limit='+this.limit).then((res)=>{
        for(let i = 0; i< res.data.result.songs.length; i++){
          this.songs2.push(res.data.result.songs[i])
        }
        loding.clear()
      })
    },
    // 加载更多歌单
    loadGd () {
      let loding = Toast.loading({
        duration: 0,
        message: '加载歌单中...',
        forbidClick: true,
        loadingType: 'spinner',
        forbidClick: true
      })
      this.gdPage = this.gdPage + 1
      let page = (this.gdPage - 1) * this.limit
      axios.get('http://liyangit.top:3000/search?keywords='+this.searchText+'&type=1000&offset='+page+'&limit='+this.limit).then((res)=>{
        for(let i = 0; i< res.data.result.playlists.length; i++){
          this.playLists2.push(res.data.result.playlists[i])
        }
        loding.clear()
      })
    },
    // 加载更多歌手
    loadGs () {
      let loding = Toast.loading({
        duration: 0,
        message: '加载歌手中...',
        forbidClick: true,
        loadingType: 'spinner',
        forbidClick: true
      })
      this.gsPage = this.gsPage + 1
      let page = (this.gsPage - 1) * this.limit
      axios.get('http://liyangit.top:3000/search?keywords='+this.searchText+'&type=100&offset='+page+'&limit='+this.limit).then((res)=>{
        for(let i = 0; i< res.data.result.artists.length; i++){
          this.artists2.push(res.data.result.artists[i])
        }
        loding.clear()
      })
    },
    // 发送请求查询
    // params : t = this
    loadData (t) {
    let page = 0
    let loding = Toast.loading({
        duration: 0,
        message: '加载中...',
        forbidClick: true,
        loadingType: 'spinner',
        forbidClick: true
      })
     axios.all(
      [
        axios.get('http://liyangit.top:3000/search?keywords='+t.searchText+'&type=1018'),//综合
        axios.get('http://liyangit.top:3000/search?keywords='+t.searchText+'&type=1&offset=0&limit='+t.limit),//单曲
        axios.get('http://liyangit.top:3000/search?keywords='+t.searchText+'&type=1000&offset=0&limit='+t.limit),//歌单
        axios.get('http://liyangit.top:3000/search?keywords='+t.searchText+'&type=100&offset=0&limit='+t.limit),//歌手
        axios.get('http://liyangit.top:3000/search?keywords='+t.searchText+'&type=1014&offset=0&limit='+t.limit)//视频
      ]
    ).then(res=>{
      // 综合界面
      if (res[0].data.result.artist !== undefined) {
        t.artists = res[0].data.result.artist.artists
        t.artistText = res[0].data.result.artist.moreText
        t.showArtist = true
      }
      if(res[0].data.result.song !== undefined){
        t.songs = res[0].data.result.song.songs
        t.songText = res[0].data.result.song.moreText
        t.showSong = true
      }
      if(res[0].data.result.playList !== undefined){
        t.playLists = res[0].data.result.playList.playLists
        t.playListText = res[0].data.result.playList.moreText
        t.showPlayList = true
      }
      if(res[0].data.result.video !== undefined){
        t.videos = res[0].data.result.video.videos
        t.videoText = res[0].data.result.video.moreText
        t.showVideo = true
      }
      // 单曲界面
      t.songs2 = res[1].data.result.songs
      t.gqCount = res[1].data.result.songCount
      // 歌单界面
      t.playLists2 = res[2].data.result.playlists
      t.gdCount = res[2].data.result.playlistCount
      // 歌手界面
      t.artists2 = res[3].data.result.artists
      t.gsCount = res[3].data.result.artistCount
      // 视频界面
      t.videos2 = res[4].data.result.videos
      t.spCount = res[4].data.result.videoCount
      loding.clear()
    })
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

    let t = this
    t.searchText = t.$route.params.value
    let isStart = t.$store.state.is.isShowPlayer
    if (isStart === true) {
        t.marginBottom = 160
        this.$store.commit('setIsShowTitle', true)
        // this.$store.commit('setIsStop', true)
    }


    // if (t.searchText.length === 0) {
    //   t.searchText = t.$route.params.value
    // }
    t.loadData(t)
    /**
     * 必选参数 : keywords : 关键词
    可选参数 : limit : 返回数量 , 默认为 30 offset : 偏移数量，用于分页 , 如 : 如 :( 页数 -1)*30, 其中 30 为 limit 的值 , 默认为 0
    type: 搜索类型；默认为 1 即单曲 , 取值意义 : 1: 单曲, 10: 专辑, 100: 歌手, 1000: 歌单, 1002: 用户, 1004: MV, 1006: 歌词, 1009: 电台, 1014: 视频, 1018:综合
     */

  } // 如果页面有keep-alive缓存功能，这个函数会触发
}
</script>
<style  scoped>
/** scoped 表示 样式自在当前组件有效*/
.van-search__action {
    padding: 0 8px;
    color: #323233;
    font-size: 14px;
    line-height: 0px;
    cursor: pointer;
    -webkit-user-select: none;
    user-select: none;
}
.van-search__content {
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
    -webkit-box-flex: 1;
    -webkit-flex: 1;
    flex: 1;
    padding-left: 12px;
    background-color:#A4A4A4;
    border-radius: 20px;
    color: white;
}
.van-field__control {
    display: block;
    box-sizing: border-box;
    width: 100%;
    min-width: 0;
    margin: 0;
    padding: 0;
    color: white;
    line-height: inherit;
    text-align: left;
    background-color: transparent;
    border: 0;
    resize: none;
}
.resultDiv {
  padding: 0px 10px;
}
.gxq p{
  font-size: 13px;
  font-family:'Raleway', 'Open Sans', sans-serif;
  font-synthesis: initial;
  font-weight: bold;
}
.qt p{
  font-size: 1.1rem;
  font-family:'Raleway', 'Open Sans', sans-serif;
  font-synthesis: initial;
  font-weight: bold;
  margin: 0px;
}
.gxq .van-cell {
    position: relative;
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
    box-sizing: border-box;
    width: 100%;
    padding: 5px 0px;
    overflow: hidden;
    color: #323233;
    font-size: 14px;
    line-height: 24px;
    background-color: #fff;
}
.qt .van-cell {
    position: relative;
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
    box-sizing: border-box;
    width: 100%;
    padding: 10px 0px;
    overflow: hidden;
    color: #323233;
    font-size: 14px;
    line-height: 24px;
    background-color: #fff;
}

#gd .van-cell__label {
    margin-top: 4px;
    color: #969799;
    font-size: 12px;
    line-height: 18px;
    position: absolute;
    margin-left: 4.5rem;
    top: 2.3rem;
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
  width: 70%;
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
