import exp from 'constants'
import { bootstrapApplicationForTest } from '../../helper/test.app.setup'
import { v4 as generateUUIDv4 } from 'uuid'
import * as _ from 'lodash'

/**
 * @group unit/repository
 * @group incomplete
 */
describe('Repository', () => {
  let appIndex: any, ppmConfig: any, ppmStorage: any
  let spyMetaDataFunc: any
  beforeEach(() => {
    const envData = bootstrapApplicationForTest()
    appIndex = envData.appIndex
    ppmConfig = envData.ppmConfig
    ppmStorage = envData.ppmStorage

    const metaDataStorage = appIndex.Globals.getMetadataStorage()
    spyMetaDataFunc = jest.spyOn(metaDataStorage, 'getEntityMetadataElementForRepository')
      .mockImplementation(() => {
        return appIndex.Card
      })
  })

  afterEach(() => {
    spyMetaDataFunc.mockRestore()
  })

  it('should not be possible to instantiate', () => {
    expect(() => {
      const repo = new appIndex.Repository()
    }).toThrow(/Repository class cannot be instantiated without being extended!/)
  })

  it('[getIndex] should return the storage index', async () => {
    const testIndexData = ['tested']
    const spyFetchIndex = jest.spyOn(appIndex.app.entityManager, 'fetchIndex').mockImplementation(() => {
      return new Promise((resolve) => {
        resolve(testIndexData)
      })
    })
    class TestRepo extends appIndex.Repository {}
    const repo = new TestRepo()
    const repoIndex = await repo.getIndex()
    expect(repoIndex).toEqual(testIndexData)
    spyFetchIndex.mockRestore()
  })

  it('[get] should return the requested entity', async () => {
    const testData = { id: generateUUIDv4(), name: 'tested', type: 'fake', identifier: 'zorro' }
    const spyFetchIndex = jest.spyOn(appIndex.app.entityManager, 'fetchOne').mockImplementation((id) => {
      return new Promise((resolve) => {
        expect(id).toEqual('it-doesnt-matter')
        resolve(testData)
      })
    })
    class TestRepo extends appIndex.Repository {}
    const repo = new TestRepo()
    const repoItem = await repo.get('it-doesnt-matter')
    expect(repoItem).toBeInstanceOf(appIndex.Card)
    expect(repoItem.id).toEqual(testData.id)
    expect(repoItem.name).toEqual(testData.name)
    expect(repoItem.type).toEqual(testData.type)
    expect(repoItem.identifier).toEqual(testData.identifier)
    // console.log(repoItem.toJson())
    spyFetchIndex.mockRestore()
  })

  it.skip('[persist] should persist the entity', async () => {
    expect(true).toBeTruthy()
  })

  it.skip('[remove] should remove the entity', async () => {
    expect(true).toBeTruthy()
  })
})
