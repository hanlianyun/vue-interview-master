import Vue from 'vue'
import Vuex from 'vuex'
import mockGenerator from './mock'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    dataList: []
  },
  mutations: {
    SETDATA (state, data) {
      let obj = state.dataList
      data.forEach((array) => {
        obj[obj.length] = array
      })

      state.dataList = []
      Vue.set(state, 'dataList', obj)
    }
  },
  getters: {
    getData: state => {
      return state.dataList
    },
    getAverage: state => {
      let count = 0
      state.dataList.forEach((list) => {
        count += list.data
      })
      return count / state.dataList.length
    }
  },
  actions: {
    getDataCall (context, item) {
      // TODO
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          mockGenerator(item.startIndex, item.count).then(function (data) {
            context.commit('SETDATA', data)
            resolve()
          })
        }, 300)
      })
    }
  }
})
