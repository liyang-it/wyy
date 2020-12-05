import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
// 使用export default 封装代码 外部全局都可以引用
export default new Vuex.Store({
  state: {
    // 定义音乐全局变量
    musicStatus: {
      startTime: '00:00',
      stopTime: '00:00',
      isStart: false,
      isStop: false,
      musicIconStyle: '',
      style: '',
      jdt: 0,
      maxPlayTime: 0
    },
    musicIndex: 0,
    musics: {},
    music: {
      id: null,
      title: null,
      artist: null,
      alName: null,
      pic: null,
      src: null,
      mvId: null
    },
    is: {
      isShowPlayer: false,
      isShowGd: false,
      isShowQuery: true,
      isShowFound: true,
      isShowRouter: true,
      isShowTitle: false
    }
  },
  mutations: {
    setIsShowFound (state, value) {
      state.is.isShowFound = value
      state.is.isShowQuery = value
    },
    setMaxJdt (state, value) {
      state.musicStatus.maxPlayTime = value
    },
    setJdt (state, value) {
      state.musicStatus.jdt = value
    },
    setPlayerStyle (state, value) {
      state.musicStatus.style = value
    },
    setIsStop (state, value) {
      state.musicStatus.isStop = value
    },
    setIsStart (state, value) {
      state.musicStatus.isStart = value
    },
    setStartTime (state, value) {
      state.musicStatus.startTime = value
    },
    setStopTime (state, value) {
      state.musicStatus.stopTime = value
    },
    setMusic (state, value) {
      state.music = value
    },
    showPlayer (state) {
      state.is.isShowPlayer = true
    },
    hidePlayer (state) {
      state.is.isShowPlayer = false
    },
    showGd (state) {
      state.is.isShowGd = true
    },
    hideGd (state) {
      state.is.isShowGd = false
    },
    setIsShowRouter (state, value) {
      state.is.isShowRouter = value
    },
    setIsShowTitle (state, value) {
      state.is.isShowTitle = value
    }
  },
  getters: {
  }
})
