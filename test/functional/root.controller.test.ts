import { CloudflareWorkerGlobalScope } from 'types-cloudflare-worker'
import { makeCloudflareWorkerRequest } from 'cloudflare-worker-mock'
import { bootstrapApplicationForTest } from '../helper/test.app.setup'

declare let self: CloudflareWorkerGlobalScope

/**
 * @group functional
 * @group _incomplete
 */
describe('Root path', () => {
  let appIndex: any, ppmConfig: any, ppmStorage: any
  beforeEach(() => {
    const envData = bootstrapApplicationForTest()
    appIndex = envData.appIndex
    ppmConfig = envData.ppmConfig
    ppmStorage = envData.ppmStorage
  })

  it('should provide app info', async () => {
    const expectedInfo = {
      name: 'cloudflare-ppm-worker',
      version: '0.0.3'
    }

    const request = makeCloudflareWorkerRequest('/', {
      method: 'GET',
      cf: {}
    })
    const response = await self.trigger('fetch', request)
    const reply = await response.json()

    expect(response.status).toBe(200)
    expect(reply).toBeInstanceOf(Array)
    expect(reply).toHaveLength(1)
    const replyInfo = reply[0]
    expect(replyInfo).toBeInstanceOf(Object)
    expect(replyInfo).toEqual(expectedInfo)
    // console.log(reply)
  })
})
