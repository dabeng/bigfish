import {SysError} from '../utils'
import {tagRef, topicRef, tagTopicRef} from '../firebase'

export default {
  async getTaggedTopics (relatedSubjectId) {
    const tagId = await tagRef.orderByChild('relatedKey').equalTo(relatedSubjectId).once('value')
      .then(snap => {
        if (!snap.val()) {
          throw new SysError('There is no tag data')
        }
        return Object.keys(snap.val())[0]
      })
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

    return {taggedTopics: taggedTopics.map(topic => Object.assign(topic.val(), { key: topic.key }))}
  }
}
