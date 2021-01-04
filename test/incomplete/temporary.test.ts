import { CloudflareWorkerGlobalScope } from 'types-cloudflare-worker'
import { createRoute as createTypedRoute } from 'typed-routes'

declare let self: CloudflareWorkerGlobalScope

/**
 * This is just a temporary test file (can be eliminated)
 *
 * @group _incomplete
 */
describe('Temporary Test', () => {
  it('should match root path', () => {
    let dynamicRoute = createTypedRoute()
    dynamicRoute = dynamicRoute.extend('')
    expect(dynamicRoute.match('/')).toBeDefined()
  })
})
