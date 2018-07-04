/**
 * Mocking client-server processing
 */
const _products = [
  {"id": 1, "title": "iPad 4 Mini", "price": 500.01, "inventory": 2},
  {"id": 2, "title": "H&M T-Shirt White", "price": 10.99, "inventory": 10},
  {"id": 3, "title": "Charli XCX - Sucker CD", "price": 19.99, "inventory": 5}
]

export default {
  getProducts (cb) {
    setTimeout(() => cb(_products), 100)
  },
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

    return {tagId, taggedTopics.map(topic => Object.assign(topic.val(), { key: topic.key }))}
  }
}
