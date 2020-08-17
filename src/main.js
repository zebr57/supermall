import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueLazyload from 'vue-lazyload'

import Toast from "components/common/toast"
//添加事件总线
Vue.prototype.$bus = new Vue()
Vue.config.productionTip = false
//安装Toast
Vue.use(Toast)
Vue.use(VueLazyload, {
	loading: require('./assets/img/common/placeholder.png')
})
new Vue({
  render: h => h(App),
	router,
	store
}).$mount('#app')
