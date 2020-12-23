import { CloudflareWorkerGlobalScope } from 'types-cloudflare-worker'
import makeCloudflareWorkerEnv, {
  makeCloudflareWorkerKVEnv
} from 'cloudflare-worker-mock'
import { createGlobalPpmConfigKV } from '../helper/ppm.config'

declare let self: CloudflareWorkerGlobalScope

/**
 * @group _incomplete
 */
describe('App', () => {
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
      log_to_console: true,
      storage_to_use: 'kvstore'
    })
  })

  it('should start up', async () => {
    expect(true).toBeTruthy()
  })
})
