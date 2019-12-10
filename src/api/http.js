import axios from 'axios'
const http = {
  downMusic: (toUrl) => {
    console.log(toUrl)
    axios({
      method: 'get',
      url: toUrl,
      responseType: 'blob',
      headers: {'content-type': 'audio/mpeg'}})
      .then((res) => {
        return res
      })
  },
  sendGet: (toUrl) => {
    let xmt = new XMLHttpRequest()
    // eslint-disable-next-line no-unused-vars
    let response = null
    xmt.open('GET', 'http://47.99.165.122:3000/search/hot/detail', false)
    xmt.onload = function (e) {
      if (xmt.status === 200) {
        response = xmt.response
        console.log('sendGet方法执行结果', xmt.status)
      }
    }
    xmt.send()
    return JSON.parse(response)
  }
}
export default http
