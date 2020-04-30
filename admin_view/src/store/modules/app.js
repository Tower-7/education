import { SET_COLLAPSE } from '../mutation-types'
const state = {
    isCollapse: true
}
console.log(SET_COLLAPSE)
const mutations = {
    setCollapse(state){
        state.isCollapse = !state.isCollapse
    }
}

const actions = {
    
}

export default {
    state,
    mutations,
    actions
}
