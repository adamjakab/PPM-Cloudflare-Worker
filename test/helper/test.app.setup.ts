import makeCloudflareWorkerEnv, {
  makeCloudflareWorkerKVEnv
} from 'cloudflare-worker-mock'
import { createGlobalPpmConfigKV } from './ppm.config'
import { createGlobalPpmStorageKV } from './ppm.storage'

// @fixme: there is no need for this function to be async or to return a promise
// @todo: need to fix all test calls
export async function setupTestEnvironment (log_to_console = false):Promise<any> {
  return new Promise<any>((resolve, reject) => {
    // Merge the Cloudflare Worker Environment into the global scope.
    Object.assign(global, makeCloudflareWorkerEnv())

    // Merge the named KV into the global scope: PPMConfigKV
    Object.assign(global, makeCloudflareWorkerKVEnv('PPMConfigKV'))

    // Merge the named KV into the global scope: PPMStorageKV
    Object.assign(global, makeCloudflareWorkerKVEnv('PPMStorageKV'))

    const ppmConfig = createGlobalPpmConfigKV({
      log_to_console: log_to_console,
      storage_to_use: 'kvstore'
    })

    const ppmStorage = createGlobalPpmStorageKV({
      /* data_file: '../data/storage.data.default.json' */
    })

    // Clear all module imports.
    jest.resetModules()

    // Import and init the app and register the listener.
    const appIndex = jest.requireActual('../../src/index')

    // const cfg = appIndex.app.appConfig
    // console.log('Config: ', cfg.getAppConfig())

    resolve({
      appIndex: appIndex,
      ppmConfig: ppmConfig,
      ppmStorage: ppmStorage
    })
  })
}
