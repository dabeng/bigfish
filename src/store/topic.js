import topic from '../api/topic'

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
    getTaggedTopics ({ commit }, tagId) {
      topic.getTaggedTopics(tagId).then(({taggedTopics}) => {
        commit('setTaggedTopics', taggedTopics)
      })
    }
  }
}
