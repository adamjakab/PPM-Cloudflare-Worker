import { CloudflareWorkerGlobalScope } from 'types-cloudflare-worker'
import makeCloudflareWorkerEnv, {
  makeCloudflareWorkerKVEnv,
  makeCloudflareWorkerRequest
} from 'cloudflare-worker-mock'
import { createGlobalPpmConfigKV } from '../helper/ppm.config'
import { createGlobalPpmStorageKV } from '../helper/ppm.storage'
import _ from 'lodash'

declare let self: CloudflareWorkerGlobalScope

/**
 * @group incomplete
 */
describe('Items', () => {
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

    createGlobalPpmConfigKV({
      log_to_console: false,
      storage_to_use: 'kvstore'
    })
  })

  it.skip('should provide notes index', async () => {
    expect(true).toBeTruthy()
  })
})
