import fetchMock from 'jest-fetch-mock'
import { CloudflareWorkerGlobalScope } from 'types-cloudflare-worker'
import makeCloudflareWorkerEnv, {
  makeCloudflareWorkerKVEnv,
  makeCloudflareWorkerRequest
} from 'cloudflare-worker-mock'
import { Platform } from '../../src/util/platform'
import { createGlobalPpmConfigKV, PpmConfig } from '../helper/ppm.config'

declare let self: CloudflareWorkerGlobalScope

/**
 * @group incomplete
 */
describe('Spinup Test', () => {
  beforeEach(() => {
    // Merge the Cloudflare Worker Environment into the global scope.
    Object.assign(global, makeCloudflareWorkerEnv())

    // Merge the named KV into the global scope: PPMConfigKV
    Object.assign(global, makeCloudflareWorkerKVEnv('PPMConfigKV'))

    // Merge the named KV into the global scope: PPMStorageKV
    Object.assign(global, makeCloudflareWorkerKVEnv('PPMStorageKV'))

    // Clear all module imports.
    jest.resetModules()

    // Import and init the Worker.
    jest.requireActual('../../src/index')
  })

  it('should be true', async () => {
    const ppmConfig = createGlobalPpmConfigKV({
      log_to_console: true
    })

    const request = makeCloudflareWorkerRequest('/', {
      method: 'GET',
      cf: {}
    })
    const response = await self.trigger('fetch', request)

    expect(response.status).toBe(200)
    expect(await response.json()).toBeDefined()
    expect(ppmConfig.timesCalledGet).toBeGreaterThan(0)
  })
})
