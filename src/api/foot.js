import store from '@/store'
const foot = {
  switch1: () => {
    store.commit('hideGd')
    store.commit('setPlayerStyle', 'none')
  },
  switch2: () => {
    store.commit('hideGd')
    store.commit('setPlayerStyle', 'none')
  }
}
export default foot
