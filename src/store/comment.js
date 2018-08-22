import commentIntf from '../api/comment'
import {SysError} from '../utils'

export default {
  namespaced: true,
  state: {
    topicId: '',
    comments: []
  },
  getters: {
    commentCount: state => {
      return state.comments ? state.comments.length : -1
    }
  },
  mutations: {
    setTopicId (state, topicId) {
      state.topicId = topicId
    },
    setComments (state, comments) {
      state.comments = comments
    },
    addComment (state, comment) {
      state.comments.push(comment)
    },
    deleteComments (state, indexes) {
      for (var i = indexes.length - 1; i >= 0; i--) {
        state.comments.splice(indexes[i], 1)
      }
    },
    updateOneComment (state, item) {
      state.comments.splice(item.index, 1, { ...item.comment, key: item.key })
    }
  },
  actions: {
    getComments ({ dispatch, commit, state }, topicId) {
      return commentIntf.getComments(topicId)
        .then(comments => {
          commit('setComments', comments)
        })
        .catch(err => {
          if (err instanceof SysError) {
            commit('setComments', [])
            console.log('<--System Error--> ' + err.message)
          } else {
            console.log(err)
          }
        })
    },
    createComment ({ state, commit }, [ topicId, comment ]) {
      commentIntf.createComment(topicId, comment).then(newCommentId => {
        commit('addComment', {...comment, key: newCommentId})
      })
    },
    updateComment ({ commit }, [ commentId, comment, index ]) {
      commentIntf.updateComment(commentId, comment)
        .then(() => {
          commit('updateOneComment', {comment, key: commentId, index})
        })
    },
    deleteComments ({ state, commit }, [ topicId, comments ]) {
      const indexArr = comments.map(ele => ele.index)
      const keyArr = comments.map(ele => ele.key)
      commentIntf.deleteComments(topicId, keyArr).then(() => {
        commit('deleteComments', indexArr)
      })
    }
    // getCurrentTopic ({ commit }, topicId) {
    //   topicIntf.getTopicById(topicId)
    //     .then(topic => {
    //       commit('setTopic', topic)
    //     })
    // }
  }
}
