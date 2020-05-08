import Vue from 'vue'
import Vuex from 'vuex'

import essay from './modules/essay'
import user from './modules/user'
import news from './modules/news'
import common from './modules/common'

Vue.use(Vuex)
const state = {
	baseURL: 'https://edu.ishuber.com',
}
const store = new Vuex.Store({
	state,
	modules:{
		essay,
		user,
		news,
		common
	}
})

export default store