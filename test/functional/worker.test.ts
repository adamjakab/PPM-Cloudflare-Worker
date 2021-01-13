import { CloudflareWorkerGlobalScope } from 'types-cloudflare-worker'
import { bootstrapApplicationForTest } from '../helper/test.app.setup'
import _ from 'lodash'

declare let self: CloudflareWorkerGlobalScope

/**
 * @group functional
 * @group _incomplete
 */
describe('WorkerApp', () => {
  let appIndex: any, ppmConfig: any, ppmStorage: any
  beforeEach(() => {
    const envData = bootstrapApplicationForTest()
    appIndex = envData.appIndex
    ppmConfig = envData.ppmConfig
    ppmStorage = envData.ppmStorage
  })

  it('should have a listener', async () => {
    expect(self.listeners.get('fetch')).toBeDefined()
  })
})
