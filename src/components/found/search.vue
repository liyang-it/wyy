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
      <div :style="{'margin-bottom': bottom+'px'}">
        <!-- 热搜-->
        <div v-show="showHotList" class="hot">
        <van-row>
          <van-col span="12" v-for="(h, i) in hotList" :key="h.index">
            <van-cell   @click="toSearchResult(h.searchWord)">
              <template #title >
                <div>
                  <font style="color: tan;font-size: 1.2rem;">{{i + 1}}</font>
                  <font style="margin-left: 10px;font-size: 0.8rem;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">{{h.searchWord}}</font>
                </div>
                <div class="van-ellipsis" style="margin-top: 4px;color: #969799;font-size: 12px;line-height: 18px;  white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">{{h.content}}</div>
              </template>
              <!-- <template #right-icon>
                 <van-icon name="fire" class="fire" size="26" color="red"/>
              </template> -->
            </van-cell>
          </van-col>
        </van-row>
      </div>
       <div v-show="showSearchAdvice" class="yb">
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
      <br>
  </div>
</template>

<script>
/* eslint-disable */
import { Popup, Toast, Search, Circle, Sticky, Col, Row, Image as VanImage, Swipe, SwipeItem, Button, PullRefresh, Grid, GridItem, Tabbar, TabbarItem, Icon, List, Loading, Cell, CellGroup,NavBar} from 'vant'
import axios from 'axios'
// import http from '@/api/http.js'
export default {
  components: {
    // http,
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
    [NavBar.name]: NavBar,
    
  },
  name: 'search',
  data () {
    return {
      searchText: '',
      hotList: [],
      showSearchAdvice: false,
      showHotList: true,
      gjzs: [],
      bottom: 30
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
    axios.get('http://47.99.165.122:3000/search/hot/detail').then((res)=>{
      this.hotList = res.data.data
    })
    
  },
  activated () {
    this.searchText = ''
    this.showHotList = true
    this.showSearchAdvice = false
    let isStart = this.$store.state.is.isShowPlayer
    if (isStart === true) {
        this.bottom = 130
    }
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
.hot .van-cell {
  -webkit-transition: all 0.5s linear;
  transition:  all 0.3s linear;
  padding: 8px 8px;
}
.hot .van-cell:hover {
  color:rgb(238, 141, 141);
  transform: scale(1.1,1.2);
}
.hot .van-cell:active {
  color:rgb(238, 141, 141);
  transform: scale(1.1,1.2);
}

.yb .van-cell:active {
  color:rgb(18, 120, 236);
}
.yb .van-cell:hover {
  color:rgb(7, 109, 224);
}
</style>
