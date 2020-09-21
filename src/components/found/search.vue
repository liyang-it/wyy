<template>
  <div>
     <div class="">
        <van-sticky :offset-top="0">
            <van-search v-model="searchText" show-action placeholder="请输入搜索关键词" @search="onSearch" @input="onInput">
              <template #action>
                  <div @click="onSearch">搜索</div>
              </template>
            </van-search>
        </van-sticky>
      </div>
       <!-- 热搜-->
       <div style="margin-bottom: 60px;" v-show="showHotList">
         <p style="margin: 0;font-size: 10px;margin-left: 20px;font-weight: 800;">热搜榜</p>
          <van-cell v-for="(h, i) in hotList" :key="h.index" :label="h.content" >
            <template #title >
             <div @click="startMusic(h)">
               <font style="color: tan;font-size: 1.2rem;">{{i + 1}}</font>
               <font style="margin-left: 10px;font-size: 0.8rem;">{{h.searchWord}}</font></div>
            </template>
            <template #right-icon>
                <van-icon name="bars" class="more" size="26" @click="songde(h)"/>
            </template>
          </van-cell>
       </div>
       <div v-show="showSearchAdvice">我是查询建议</div>
       <div v-show="showSearchList">我是查询结果</div>
  </div>
</template>

<script>
import axios from 'axios'
import http from '@/api/http.js'
import { Popup, Toast, Search, Circle, Sticky, Col, Row, Image as VanImage, Swipe, SwipeItem, Button, PullRefresh, Grid, GridItem, Tabbar, TabbarItem, Icon, List, Loading, Cell, CellGroup } from 'vant'
export default {
  components: {
    http,
    axios,
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
    [CellGroup.name]: CellGroup
  },
  name: 'search',
  data () {
    return {
      searchText: '',
      hotList: [],
      showSearchAdvice: false,
      showHotList: true,
      showSearchList: false
    }
  },
  methods: {
    onSearch () {
      console.log('查询', this.searchText)
      this.showHotList = false
      this.showSearchAdvice = false
      this.showSearchList = true
    },
    onInput (value) {
      if (value.length === 0) {
        this.showHotList = true
        this.showSearchAdvice = false
        this.showSearchList = false
      } else {
        this.showHotList = false
        this.showSearchAdvice = true
        this.showSearchList = false
      }
      console.log('查询', value)
    }
  },
  created () {
    // eslint-disable-next-line no-unused-vars
    let response = http.sendGet('http://47.99.165.122:3000/search/hot/detail')
    this.hotList = response.data
    console.log(response)
  }
}
</script>
<style>
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
}
</style>
