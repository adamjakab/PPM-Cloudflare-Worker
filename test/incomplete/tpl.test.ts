import { bootstrapApplicationForTest } from '../helper/test.app.setup'
import * as _ from 'lodash'

/**
 * @group suite/block
 * @group _incomplete
 */
describe('TestTemplate', () => {
  let appIndex: any, ppmConfig: any, ppmStorage: any
  beforeEach(() => {
    const envData = bootstrapApplicationForTest()
    appIndex = envData.appIndex
    ppmConfig = envData.ppmConfig
    ppmStorage = envData.ppmStorage
  })

  it('should work', () => {
    expect(true).toBeTruthy()
  })
})
