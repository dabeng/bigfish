import {SysError} from '../utils'
import {db, topicCommentRef, commentRef} from '../firebase'

export default {
  // getCommentId (relatedSubjectId) {
  //   return tagRef.orderByChild('relatedKey').equalTo(relatedSubjectId).once('value')
  //     .then(snap => {
  //       if (!snap.val()) {
  //         throw new SysError('There is no tag data')
  //       }
  //       return Object.keys(snap.val())[0]
  //     })
  // },
  async getComments (topicId) {
    const commentIds = await topicCommentRef.child(topicId).once('value')
      .then(snap => {
        if (!snap.val()) {
          throw new SysError('There is no topicComment data')
        }
        return Object.keys(snap.val())
      })
    const comments = await Promise.all(commentIds.map(id => commentRef.child(id).once('value').then(snap => snap)))
      .then(cmts => {
        if (!cmts.length) {
          throw new SysError('There is no topic data with associated tag')
        }
        return cmts
      })
    return comments.map(cmt => Object.assign(cmt.val(), { key: cmt.key }))
  },
  createComment (topicKey, newComment) {
    var updates = {}
    var newCommentKey = commentRef.push().key
    updates['/comment/' + newCommentKey] = newComment
    updates['/topicComment/' + topicKey + '/' + newCommentKey] = true
    return db.ref().update(updates).then(() => {
      return newCommentKey
    })
  },
  updateComment (commentKey, updatedCmt) {
    var updates = {}
    updates['/comment/' + commentKey] = updatedCmt
    return db.ref().update(updates)
  },
  deleteComments (topicKey, commentKeys) {
    let updates = {}
    for (let cmtKey of commentKeys) {
      updates['/comment/' + cmtKey] = null
      updates['/topicComment/' + topicKey + '/' + cmtKey] = null
    }
    return db.ref().update(updates)
  }
  // getTopicById (topicId) {
  //   return topicRef.orderByKey().equalTo(topicId).once('value')
  //     .then(snap => snap.val()[topicId])
  // }
}
