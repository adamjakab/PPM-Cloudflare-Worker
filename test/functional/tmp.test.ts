
import fetchMock from 'jest-fetch-mock'
import {
  CloudflareWorkerGlobalScope,
  CloudflareWorkerKVOptions
} from 'types-cloudflare-worker'

import makeCloudflareWorkerEnv, {
  makeCloudflareWorkerKVEnv,
  makeCloudflareWorkerRequest
} from 'cloudflare-worker-mock'
import { Platform } from '../../src/util/platform'

declare let self: CloudflareWorkerGlobalScope

/**
 * @group incomplete
 */
describe('something', () => {
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

  it('should work', async () => {
    expect(true).toBeTruthy()
  })

  /*
  it('should be true', async () => {
    const request = makeCloudflareWorkerRequest('/', {
      method: 'GET',
      cf: {}
    })
    const response = await self.trigger('fetch', request)

    expect(response.status).toBe(200)
    expect(await response.json()).toBeDefined()
  })
   */
})
