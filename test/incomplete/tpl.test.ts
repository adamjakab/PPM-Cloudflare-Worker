import { setupTestEnvironment } from '../helper/test.app.setup'
import { CloudflareWorkerGlobalScope } from 'types-cloudflare-worker'
import * as _ from 'lodash'

declare let self: CloudflareWorkerGlobalScope

/**
 * @group suite/block
 * @group incomplete
 */
describe('Test Template', () => {
  let appIndex: any, ppmConfig: any, ppmStorage: any
  beforeEach(() => {
    return new Promise<void>((resolve, reject) => {
      setupTestEnvironment().then((envData) => {
        appIndex = envData.appIndex
        ppmConfig = envData.ppmConfig
        ppmStorage = envData.ppmStorage
        resolve()
      })
    })
  })

  it('should work', () => {
    expect(true).toBeTruthy()
  })
})
