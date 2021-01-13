import { bootstrapApplicationForTest } from '../../helper/test.app.setup'
import * as _ from 'lodash'

/**
 * @group unit/repository
 * @group _incomplete
 */
describe('Card Repository', () => {
  let appIndex: any, ppmConfig: any, ppmStorage: any
  beforeEach(() => {
    const envData = bootstrapApplicationForTest()
    appIndex = envData.appIndex
    ppmConfig = envData.ppmConfig
    ppmStorage = envData.ppmStorage
  })

  it('should have a storage table name', async () => {
    const repo = new appIndex.CardRepository()
    const repoIndex = await repo.getIndex()
    expect(repoIndex).toBeInstanceOf(Array)
    expect(repoIndex).toHaveLength(5)
    // console.log(repoIndex)
  })
})
