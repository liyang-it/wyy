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
  }
}
export default http
