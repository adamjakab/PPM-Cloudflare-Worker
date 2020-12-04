/*
 * Using WebWorker library included with TypeScript
 * tsc --lib es5,webworker # or anything es5+
 *
 * https://github.com/Microsoft/TypeScript/issues/14877#issuecomment-340279293
 */

import fetchMock from 'jest-fetch-mock'
import {
  CloudflareWorkerGlobalScope,
  CloudflareWorkerKVOptions
} from 'types-cloudflare-worker'

// import makeCloudflareWorkerEnv from 'cloudflare-worker-mock'
import makeCloudflareWorkerEnv, {
  makeCloudflareWorkerKVEnv,
  makeCloudflareWorkerRequest
} from 'cloudflare-worker-mock'

declare let self: CloudflareWorkerGlobalScope

describe('worker', () => {
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

  it('should have a listener', async () => {
    expect(self.listeners.get('fetch')).toBeDefined()
  })

  it('should be working', async () => {
    fetchMock.mockResponseOnce('Hello')

    // const request = new Request('/')
    const request = makeCloudflareWorkerRequest('/', {
      cf: {
        country: 'DK'
      }
    })

    const response = await self.trigger('fetch', request)

    // expect(fetchMock).toBeCalledTimes(1)
    expect(response.status).toBe(200)
    expect(await response.text()).toBeDefined()

  })
})
