import makeCloudflareWorkerEnv, {
  makeCloudflareWorkerKVEnv
} from 'cloudflare-worker-mock'
import { createGlobalPpmConfigKV } from './ppm.config'
import { createGlobalPpmStorageKV } from './ppm.storage'

/**
 * Bootstrap the application for test
 */
export function bootstrapApplicationForTest (): {appIndex:any, ppmConfig:any, ppmStorage:any} {
  // Merge the Cloudflare Worker Environment into the global scope.
  Object.assign(global, makeCloudflareWorkerEnv())

  // Merge the named KV into the global scope: PPMConfigKV
  Object.assign(global, makeCloudflareWorkerKVEnv('PPMConfigKV'))

  // Merge the named KV into the global scope: PPMStorageKV
  Object.assign(global, makeCloudflareWorkerKVEnv('PPMStorageKV'))

  const ppmConfig = createGlobalPpmConfigKV({})

  const ppmStorage = createGlobalPpmStorageKV({})

  // Clear all module imports, import and init the app and register the listener.
  jest.resetModules()
  const appIndex = jest.requireActual('../../src/index')

  // const cfg = appIndex.app.appConfig
  // console.log('Config: ', cfg.getAppConfig())

  return ({
    appIndex: appIndex,
    ppmConfig: ppmConfig,
    ppmStorage: ppmStorage
  })
}
