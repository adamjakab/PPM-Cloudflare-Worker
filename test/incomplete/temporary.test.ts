import { CloudflareWorkerGlobalScope } from 'types-cloudflare-worker'
import { createRoute as createTypedRoute } from 'typed-routes'
import { setupTestEnvironment } from '../helper/test.app.setup'

declare let self: CloudflareWorkerGlobalScope

/**
 * This is just a temporary test file (can be eliminated)
 *
 * @group _incomplete
 */
describe('Temporary Test', () => {
  let appIndex: any, ppmConfig: any, ppmStorage: any
  beforeEach(() => {
    return new Promise<void>((resolve, reject) => {
      setupTestEnvironment(true).then((envData) => {
        appIndex = envData.appIndex
        ppmConfig = envData.ppmConfig
        ppmStorage = envData.ppmStorage
        resolve()
      })
    })
  })

  it('should work', () => {
    expect(true).toBeTruthy()
  })

  /*
  it('should match root path', () => {
    let dynamicRoute = createTypedRoute()
    dynamicRoute = dynamicRoute.extend('')
    expect(dynamicRoute.match('/')).toBeDefined()
  })
   */
})
