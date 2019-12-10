<template>
<div id="app">
  <foot></foot>
  <player></player>
</div>
</template>
<script>
import { Popup, Toast, Search, Circle, Sticky, Col, Row, Image as VanImage, Swipe, SwipeItem, Button, PullRefresh, Grid, GridItem, Tabbar, TabbarItem, Notify, Icon, List, Loading, Cell, CellGroup } from 'vant'
import foot from '@/components/foot/foot'
import player from '@/components/player/player'
export default {
  /** 注册组件 */
  components: {
    'foot': foot,
    'player': player,
    [Popup.name]: Popup,
    [Toast.name]: Toast,
    [Sticky.name]: Sticky,
    [Search.name]: Search,
    [Col.name]: Col,
    [Row.name]: Row,
    [VanImage.name]: VanImage,
    [Circle.name]: Circle,
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem,
    [Button.name]: Button,
    [PullRefresh.name]: PullRefresh,
    [Grid.name]: Grid,
    [GridItem.name]: GridItem,
    [Tabbar.name]: Tabbar,
    [TabbarItem.name]: TabbarItem,
    [Icon.name]: Icon,
    [List.name]: List,
    [Loading.name]: Loading,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [Notify.name]: Notify
  },
  name: 'index',
  data () {
    return {
    }
  },
  methods: {
  },
  mounted: function () {
  },
  created () {
  }
}
</script>
<style>
</style>
