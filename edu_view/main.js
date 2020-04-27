import Vue from 'vue'
import App from './App'
import store from './store'

import globalVariable from '@/common/global_variable.js'
import loginStatus from '@/common/loginStatus.js'

Vue.config.productionTip = false

Vue.prototype.GLOBAL = globalVariable
Vue.prototype.$store = store
Vue.prototype.$loginStatus = loginStatus

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
