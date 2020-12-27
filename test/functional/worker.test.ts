import { CloudflareWorkerGlobalScope } from 'types-cloudflare-worker'
import makeCloudflareWorkerEnv from 'cloudflare-worker-mock'

declare let self: CloudflareWorkerGlobalScope

/**
 * @group functional
 */
describe('worker', () => {
  beforeEach(() => {
    // Merge the Cloudflare Worker Environment into the global scope.
    Object.assign(global, makeCloudflareWorkerEnv())

    // Clear all module imports.
    jest.resetModules()

    // Import and init the Worker.
    jest.requireActual('../../src/index')
  })

  it('should have a listener', async () => {
    expect(self.listeners.get('fetch')).toBeDefined()
  })
})
