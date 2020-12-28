import makeCloudflareWorkerEnv, {
  makeCloudflareWorkerKVEnv
} from 'cloudflare-worker-mock'
import { createGlobalPpmConfigKV } from './ppm.config'
import { createGlobalPpmStorageKV } from './ppm.storage'

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
      data_file: '../data/storage.data.default.json'
    })

    // Clear all module imports.
    jest.resetModules()

    // Import and init the app and register the listener.
    const appIndex = jest.requireActual('../../src/index')

    waitForAppInitialization().then(() => {
      resolve({
        appIndex: appIndex,
        ppmConfig: ppmConfig,
        ppmStorage: ppmStorage
      })
    })
  })
}
/**
 * The 'app.initialize()' in the index is an async method which will delay the registration of the handler listener
 * In order to correctly test it, we need to wait for it
 */
async function waitForAppInitialization () {
  let cnt = 0
  const index = jest.requireActual('../../src/index')
  const app = index.app
  while (cnt < 100) {
    cnt++
    if (app.setupComplete) {
      break
    }
    await delay(50)
  }
  return app.setupComplete
}

function delay (ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms))
}
