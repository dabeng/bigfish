import topic from '../../api/topic'

export default {
  namespaced: true,
  state: {
    taggedTopics: []
  },
  mutations: {
    setTaggedTopics (state, topics) {
      state.taggedTopics = topics
    }
  },
  actions: {
    getTaggedTopics ({ commit }) {
      topic.getTaggedTopics(topics => {
        commit('setTaggedTopics', topics)
      })
    }
  }
}
