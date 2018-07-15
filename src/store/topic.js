import topicIntf from '../api/topic'
import {SysError} from '../utils'

export default {
  namespaced: true,
  state: {
    tagId: '',
    taggedTopics: undefined
  },
  getters: {
    topicCount: state => {
      return state.taggedTopics ? state.taggedTopics.length : -1
    }
  },
  mutations: {
    setTagId (state, tagId) {
      state.tagId = tagId
    },
    setTaggedTopics (state, topics) {
      state.taggedTopics = topics
    },
    addItem2TaggedTopics (state, topic) {
      state.taggedTopics.push(topic)
    },
    deleteTaggedTopics (state, indexes) {
      for (var i = indexes.length - 1; i >= 0; i--) {
        state.taggedTopics.splice(indexes[i], 1)
      }
    }
  },
  actions: {
    getTagId ({ commit }, relatedSubjectId) {
      return topicIntf.getTagId(relatedSubjectId)
        .then(tagId => {
          commit('setTagId', tagId)
        })
    },
    async getTaggedTopics ({ dispatch, commit, state }, relatedSubjectId) {
      await dispatch('getTagId', relatedSubjectId)
      return topicIntf.getTaggedTopics(state.tagId)
        .then(taggedTopics => {
          commit('setTaggedTopics', taggedTopics)
        })
        .catch(err => {
          if (err instanceof SysError) {
            commit('setTaggedTopics', [])
            console.log('<--System Error--> ' + err.message)
          } else {
            console.log(err)
          }
        })
    },
    createTaggedTopic ({ state, commit }, topic) {
      topicIntf.createTaggedTopic(state.tagId, topic).then(newTopicId => {
        commit('addItem2TaggedTopics', {...topic, key: newTopicId})
      })
    },
    deleteTaggedTopics ({ state, commit }, topics) {
      const indexArr = topics.map(ele => ele.index)
      const keyArr = topics.map(ele => ele.key)
      topicIntf.deleteTaggedTopics(state.tagId, keyArr).then(() => {
        commit('deleteTaggedTopics', indexArr)
      })
    }
  }
}
