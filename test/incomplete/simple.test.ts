import { CloudflareWorkerGlobalScope } from 'types-cloudflare-worker'
import { createRoute as createTypedRoute } from 'typed-routes'

declare let self: CloudflareWorkerGlobalScope

/**
 * @group ___incomplete
 */
describe('Simple Test', () => {
  it('should match root path', () => {
    let dynamicRoute = createTypedRoute()
    dynamicRoute = dynamicRoute.extend('')
    expect(dynamicRoute.match('/')).toBeDefined()
  })
})
