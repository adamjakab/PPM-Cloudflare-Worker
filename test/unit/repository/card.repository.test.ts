import { v4 as generateUUIDv4 } from 'uuid'
import {
  CardRepository,
  EntityManager,
  Card
} from '../../../src/index'
import * as _ from 'lodash'

const defaultData = {
  notes: [
    { id: generateUUIDv4(), name: 'Ficus', dateCreated: '2020-08-15' },
    { id: generateUUIDv4(), name: 'Fityisz', type: 'video', text: 'hi!' },
    { id: generateUUIDv4(), name: 'Kecske', type: 'audio' },
    { id: generateUUIDv4(), name: 'Kigyo', text: 'Adi is back!' }
  ]
}

/**
 * @group unit/repository
 * @group _incomplete
 */
describe('NoteRepository', () => {
  beforeEach(async () => {
    // EntityManager.registerEntities([Card])
  })

  it('should have a storage table name', () => {
    const repo = new CardRepository()
    expect(repo.storageTableName).toEqual('cards')
  })
})
