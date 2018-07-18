import {SysError} from '../utils'
import {db, tagRef, topicRef, tagTopicRef} from '../firebase'

export default {
  getTagId (relatedSubjectId) {
    return tagRef.orderByChild('relatedKey').equalTo(relatedSubjectId).once('value')
      .then(snap => {
        if (!snap.val()) {
          throw new SysError('There is no tag data')
        }
        return Object.keys(snap.val())[0]
      })
  },
  async getTaggedTopics (tagId) {
    const topicIds = await tagTopicRef.child(tagId).once('value')
      .then(snap => {
        if (!snap.val()) {
          throw new SysError('There is no tagTopic data')
        }
        return Object.keys(snap.val())
      })
    const taggedTopics = await Promise.all(topicIds.map(id => topicRef.child(id).once('value').then(snap => snap)))
      .then(topics => {
        if (!topics.length) {
          throw new SysError('There is no topic data with associated tag')
        }
        return topics
      })
    return taggedTopics.map(topic => Object.assign(topic.val(), { key: topic.key }))
  },
  createTaggedTopic (tagId, newTopic) {
    var updates = {}
    var newTopicKey = topicRef.push().key
    updates['/topic/' + newTopicKey] = newTopic
    updates['/tagTopic/' + tagId + '/' + newTopicKey] = true
    return db.ref().update(updates).then(() => {
      return newTopicKey
    })
  },
  deleteTaggedTopics (tagId, topicKeys) {
    let updates = {}
    for (let topicId of topicKeys) {
      updates['/topic/' + topicId] = null
      updates['/tagTopic/' + tagId + '/' + topicId] = null
    }
    return db.ref().update(updates)
  },
  getTopicById (topicId) {
    return topicRef.orderByKey().equalTo(topicId).once('value')
      .then(snap => snap.val()[topicId])
  }
}
