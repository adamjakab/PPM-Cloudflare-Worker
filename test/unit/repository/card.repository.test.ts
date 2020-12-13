/* tslint:disable:no-console */
import * as _ from 'lodash'
import { Card } from '../../../src/entity/card'

import EntityManager from '../../../src/repository/entity-manager'
import { CardRepository } from '../../../src/repository/card.repository'
import { v4 as generateUUIDv4 } from 'uuid'
import { KVStore } from '../../../src/storage/KVStore'
// import { Note } from "../../../src/entity/note";
// import { InstanceCreator } from "../../../src/util/instance-creator";

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
 */
describe('NoteRepository', () => {
  beforeEach(async () => {
    EntityManager.registerEntities([Card])
  })

  it('should have a storage table name', () => {
    const repo = new CardRepository()
    expect(repo.storageTableName).not.toBeUndefined()
    expect(repo.storageTableName).toEqual('cards')
  })
})
