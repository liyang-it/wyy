import store from '../store'
/**
 * 此API player.vue found.vue 共享使用
 */
const playerApi = {
  downFileName: store.state.music.title + '-' + store.state.music.artist,
  showGd: () => {
    // 显示歌单 隐藏播放界面
    // store.commit('showGd')
    store.commit('setIsShowRouter', true)
    store.commit('setPlayerStyle', 'none')
    store.commit('setIsShowTitle', true)
  },
  showPlay: () => {
    store.commit('setPlayerStyle', '')
    store.commit('showPlayer')
    store.commit('setIsShowRouter', false)
    store.commit('setIsShowTitle', false)
    // store.commit('hideGd')
  },
  getMusicRunTime: (s) => {
    // s = 秒  根据秒返回音乐时间
    // 音乐分钟
    let hh = Math.floor(s / 60) + ''
    let ss = s % 60 + ''
    hh = (hh.length === 1) ? '0' + hh : hh
    ss = (ss.length === 1) ? '0' + ss : ss
    let time = hh + ':' + ss
    return time
  }
}
export default playerApi
