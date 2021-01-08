import { CloudflareWorkerGlobalScope } from 'types-cloudflare-worker'
import { setupTestEnvironment } from '../helper/test.app.setup'
import { getKVStoreDataStructure, getRandomKVStoreData } from '../helper/test.helper'
import * as _ from 'lodash'
import { createRoute as createTypedRoute } from 'typed-routes'

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

  it('should create random KV data', () => {
    // const data = getRandomKVStoreData(3)
    const data = ppmStorage.datastore
    console.log(data)

    expect(_.values(data)).toHaveLength(6)
  })

  it('should work', () => {
    expect(true).toBeTruthy()
  })

  it('should match root path', () => {
    let dynamicRoute = createTypedRoute()
    dynamicRoute = dynamicRoute.extend('')
    expect(dynamicRoute.match('/')).toBeDefined()
  })
})
