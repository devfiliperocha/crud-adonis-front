import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    msg:{
      msgTimeout: 4000,
      msgShow: false,
      msgText: '',
      msgColor: 'info',
    },
  },
  mutations: {
    showMsg(state,values){
      state.msg = {
        ...state.msg,
        msgShow: true,
        msgText: values.text,
        msgColor: values.color
      }
    }
  },
  actions: {
  },
  modules: {
  }
})
