
import {
  CloudflareWorkerGlobalScope,
  CloudflareWorkerKVOptions
} from 'types-cloudflare-worker'

import makeCloudflareWorkerEnv, {
  makeCloudflareWorkerKVEnv,
  makeCloudflareWorkerRequest
} from 'cloudflare-worker-mock'

declare let self: CloudflareWorkerGlobalScope

/**
 * @group functional
 */
describe('root controller', () => {
  beforeEach(() => {
    // Merge the Cloudflare Worker Environment into the global scope.
    Object.assign(global, makeCloudflareWorkerEnv())

    // Merge the named KV into the global scope
    Object.assign(global, makeCloudflareWorkerKVEnv('PPMStorageKV'))

    // Clear all module imports.
    jest.resetModules()

    // Import and init the Worker.
    jest.requireActual('../../src/index')
  })

  it('should respond to GET(/)', async () => {
    const request = makeCloudflareWorkerRequest('/', {
      method: 'GET',
      cf: {}
    })
    const response = await self.trigger('fetch', request)

    expect(response.status).toBe(200)
    expect(await response.json()).toBeDefined()
  })

  it('should respond to GET(/) with application info', async () => {
    const expectedInfo = {
      name: 'cloudflare-ppm-worker',
      version: '0.0.2'
    }

    const request = makeCloudflareWorkerRequest('/', {
      method: 'GET',
      cf: {}
    })
    const response = await self.trigger('fetch', request)
    const responseData = await response.json()

    expect(response.status).toBe(200)
    expect(responseData).toBeInstanceOf(Array)
    expect(responseData).toHaveLength(1)
    const realInfo = responseData[0]
    expect(realInfo).toBeInstanceOf(Object)
    expect(realInfo).toEqual(expectedInfo)
  })
})