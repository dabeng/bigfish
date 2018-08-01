import Vue from 'vue'
import Vuex from 'vuex'
import createLogger from 'vuex/dist/logger'
import topic from './topic'
import comment from './comment'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules: {
    topic,
    comment
  },
  strict: debug,
  plugins: debug ? [createLogger()] : []
})
