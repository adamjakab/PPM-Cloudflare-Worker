import * as _ from 'lodash'
import { v4 as generateUUIDv4 } from 'uuid'

/**
 * TestEntity allows for testing the Entity class which cannot be instantiated directly
 *
 * @param appIndex
 * @return Entity
 */
function getTestEntity (appIndex:any) {
  class TestRepository extends appIndex.Repository {}
  const EnhancedEntity = appIndex.EntityDecorator
  @EnhancedEntity(TestRepository)
  class TestEntity extends appIndex.Entity {}
  return new TestEntity()
}

function getRandomKVStoreData (length: number) {
  const items = []
  let dateCreated, dateModified
  const startDate = new Date('2010-01-01T00:00:00.000Z')
  const endDate = new Date()
  const types = ['passcard', 'note', 'link', 'file']
  const identifiers = ['domain\\.ext', 'otherdomain\\.ext', 'abc', 'xyz', 'resource_1', 'resource_2']

  for (let i = 0; i < length; i++) {
    dateCreated = getRandomDate(startDate, endDate)
    dateModified = getRandomDate(dateCreated, endDate)
    items.push({
      name: 'random-data-' + (i + 1),
      dateCreated: dateCreated,
      dateModified: dateModified,
      type: _.nth(types, _.random(0, types.length - 1)),
      identifier: _.nth(identifiers, _.random(0, identifiers.length - 1))
    })
  }
  return getKVStoreDataStructure(items)
}
/**
 * Creates a collection of items indexed by their ID as they are stored in the KV store and adds the index array
 * @param items
 */
function getKVStoreDataStructure (items: any[]) {
  const answer = {}
  const index: any[] = []
  let indexItem
  _.each(items, item => {
    item = addRandomIdToItem(item)
    _.set(answer, item.id, item)
    indexItem = {
      id: item.id,
      name: item.name,
      type: _.get(item, 'type', null),
      identifier: _.get(item, 'identifier', null)
    }
    index.push(indexItem)
  })
  _.set(answer, 'index', index)
  return answer
}

/**
 * Adds a random UUIDv4 ID to the item
 * @param item
 */
function addRandomIdToItem (item: any) {
  return _.extend({ id: generateUUIDv4() }, item)
}

function getRandomDate (from: Date, to: Date) {
  const fromTime = from.getTime()
  const toTime = to.getTime()
  return new Date(fromTime + Math.random() * (toTime - fromTime))
}

// Export
export {
  getTestEntity,
  getRandomKVStoreData, getKVStoreDataStructure, addRandomIdToItem
}
