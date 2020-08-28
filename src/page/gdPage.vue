<template>
  <div>
    {{msg}}
  </div>
</template>

<script>
export default {
  name: 'gdPage',
  data () {
    return {
      msg: '歌单页面'

    }
  },
  created () {
    // eslint-disable-next-line no-unused-vars
    let gd = JSON.parse(localStorage.getItem('gd'))
    console.log('获取跳转携带参数:', gd.id)
  }

}
</script>
