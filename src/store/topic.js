import topicIntf from '../api/topic'

export default {
  namespaced: true,
  state: {
    taggedTopics: []
  },
  mutations: {
    setTaggedTopics (state, topics) {
      state.taggedTopics = topics
    },
    addItem2TaggedTopics (state, topic) {
      state.taggedTopics.push(topic)
    }
  },
  actions: {
    getTaggedTopics ({ commit }, tagId) {
      topicIntf.getTaggedTopics(tagId).then(({taggedTopics}) => {
        commit('setTaggedTopics', taggedTopics)
      })
    },
    createTaggedTopic ({ commit }, [tagId, topic]) {
      topicIntf.createTaggedTopic(tagId, topic).then(() => {
        commit('addItem2TaggedTopics', topic)
      })
    }
  }
}
