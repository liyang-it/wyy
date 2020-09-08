import store from '@/store'
const foot = {
  switch1: () => {
    store.commit('hideGd')
    store.commit('setIsShowFound', true)
    store.commit('setPlayerStyle', 'none')
    store.commit('setMusicIconStyle', '')
  },
  switch2: () => {
    store.commit('hideGd')
    store.commit('setIsSwitch', true)
    store.commit('setPlayerStyle', 'none')
    store.commit('setMusicIconStyle', '')
  }
}
export default foot
