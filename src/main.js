import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'  // 引入element的样式文件
import axios from 'axios'
import '@/assets/icon/iconfont.css'

Vue.use(Element)
axios.defaults.baseURL = 'https:autumnfish.cn'
axios.defaults.headers.post['Content-Type'] = 'application/json'
Vue.prototype.$http = axios

Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: function (h) { return h(App) }
}).$mount('#app')
