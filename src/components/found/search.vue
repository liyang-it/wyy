<template>
  <div>
     <div class="">
        <van-sticky :offset-top="0">
          <van-nav-bar title="搜索" left-text="返回" left-arrow @click-left="$router.back(-1)"/>
            <van-search v-model="searchText" show-action placeholder="请输入搜索关键词" @search="onSearch" @input="onInput">
              <template #action>
                  <div>
                    <van-icon size="32" name="search" @click="onSearch"/>
                  </div>
              </template>
            </van-search>
            <div style="background-color: white;" v-show="showSearchAdvice">
            <p style="color: #1989fa;margin-left: 20px;margin-top: -2px;">搜索&nbsp;&nbsp;&nbsp;“{{searchText}}”</p>
            </div>
        </van-sticky>
      </div>
       <!-- 热搜-->
       <div style="margin-bottom: 140px;" v-show="showHotList">
         <p style="margin: 0;font-size: 10px;margin-left: 20px;font-weight: 800;">热搜榜</p>
          <van-cell v-for="(h, i) in hotList" :key="h.index" :label="h.content" @click="toSearchResult(h.searchWord)">
            <template #title >
             <div >
               <font style="color: tan;font-size: 1.2rem;">{{i + 1}}</font>
               <font style="margin-left: 10px;font-size: 0.8rem;">{{h.searchWord}}</font></div>
            </template>
            <template #right-icon>
                 <van-icon name="fire" class="fire" size="26" color="red"/>
            </template>
          </van-cell>
       </div>
       <div v-show="showSearchAdvice">
          <!-- 搜索预备关键字-->
          <van-cell v-for="(item, index) in gjzs" :key="index" @click="toSearchResult(item.keyword)">
            <template #title >
             <div >
              <van-icon name="search" />
              <font style="margin-left: 10px;font-size: 0.8rem;">{{item.keyword}}</font>
              </div>
            </template>
          </van-cell>
       </div>
  </div>
</template>

<script>
/* eslint-disable */
import { Popup, Toast, Search, Circle, Sticky, Col, Row, Image as VanImage, Swipe, SwipeItem, Button, PullRefresh, Grid, GridItem, Tabbar, TabbarItem, Icon, List, Loading, Cell, CellGroup,NavBar  } from 'vant'
import axios from 'axios'
import http from '@/api/http.js'
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
    [CellGroup.name]: CellGroup,
    [NavBar.name]: NavBar 
  },
  name: 'search',
  data () {
    return {
      searchText: '',
      hotList: [],
      showSearchAdvice: false,
      showHotList: true,
      gjzs: []
    }
  },
  methods: {
    onSearch () {
      if (this.searchText.length === 0) {
        return
      }
      this.toSearchResult(this.searchText)
    },
    onInput (value) {
      if (value.length === 0) {
        this.showHotList = true
        this.showSearchAdvice = false
      } else {
        this.showHotList = false
        this.showSearchAdvice = true
      }
      if (this.searchText.length === 0) {
        return
      }
      axios.get('http://liyangit.top:3000/search/suggest?keywords=' + value + '&type=mobile').then((res) => {
        this.gjzs = res.data.result.allMatch
      })
    },
    toSearchResult(value){
      this.$router.push({path: `/searchResult/${value}`})
    }
  },
  created () {
    // eslint-disable-next-line no-unused-vars
    let response = http.sendGet('http://47.99.165.122:3000/search/hot/detail')
    this.hotList = response.data
  },
  activated () {
    this.searchText = ''
    this.showHotList = true
    this.showSearchAdvice = false
  }
}
</script>
<style scoped>
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
.van-search__action {
    padding: 0 8px;
    color: #323233;
    font-size: 14px;
    line-height: 0px;
    cursor: pointer;
    -webkit-user-select: none;
    user-select: none;
}
</style>
