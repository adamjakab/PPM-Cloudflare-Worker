import { CloudflareWorkerGlobalScope } from 'types-cloudflare-worker'
import { makeCloudflareWorkerRequest } from 'cloudflare-worker-mock'
import { setupTestEnvironment } from '../helper/test.app.setup'
import _ from 'lodash'

declare let self: CloudflareWorkerGlobalScope

/**
 * @group functional
 * @group _incomplete
 *
 * Get a single card
 */
describe('Rest API', () => {
  beforeEach(() => {
    return setupTestEnvironment()
  })

  it('should respond with 404 if route is not registered', async () => {
    const request = makeCloudflareWorkerRequest('/non_existent_route', {
      method: 'GET',
      cf: {}
    })
    const response = await self.trigger('fetch', request)
    const reply = await response.json()

    expect(response.status).toBe(404)
    expect(reply).toBeInstanceOf(Array)
    expect(reply).toEqual([{
      error: true,
      message: 'Route is not registered!',
      route: '/non_existent_route',
      method: 'GET'
    }])
  })
})
