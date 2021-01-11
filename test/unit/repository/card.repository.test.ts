import { CloudflareWorkerGlobalScope } from 'types-cloudflare-worker'
import makeCloudflareWorkerEnv, {
  makeCloudflareWorkerKVEnv,
  makeCloudflareWorkerRequest
} from 'cloudflare-worker-mock'
import { v4 as generateUUIDv4 } from 'uuid'
import { CardRepository } from '../../../src'
import { createGlobalPpmConfigKV } from '../../helper/ppm.config'
import * as _ from 'lodash'
import { createGlobalPpmStorageKV } from '../../helper/ppm.storage'

declare let self: CloudflareWorkerGlobalScope

const defaultData = {
  notes: [
    { id: generateUUIDv4(), name: 'Ficus', dateCreated: '2020-08-15' },
    { id: generateUUIDv4(), name: 'Fityisz', type: 'video', text: 'hi!' },
    { id: generateUUIDv4(), name: 'Kecske', type: 'audio' },
    { id: generateUUIDv4(), name: 'Kigyo', text: 'Adi is back!' }
  ]
}

/**
 * @group unit/repository
 * @group _incomplete
 */
describe('Card Repository', () => {
  let index: any

  beforeEach(async () => {
    // Merge the Cloudflare Worker Environment into the global scope.
    Object.assign(global, makeCloudflareWorkerEnv())

    // Merge the named KV into the global scope: PPMConfigKV
    Object.assign(global, makeCloudflareWorkerKVEnv('PPMConfigKV'))

    // Merge the named KV into the global scope: PPMStorageKV
    Object.assign(global, makeCloudflareWorkerKVEnv('PPMStorageKV'))

    createGlobalPpmConfigKV({
      log_to_console: false,
      storage_to_use: 'kvstore'
    })

    createGlobalPpmStorageKV({})

    // Clear all module imports.
    jest.resetModules()

    // Import and init the Worker.
    index = jest.requireActual('../../../src/index')
  })

  it('should have a storage table name', async () => {
    const repo: CardRepository = new index.CardRepository()
    const repoIndex = await repo.getIndex()
    expect(repoIndex).toBeInstanceOf(Array)
    expect(repoIndex).toHaveLength(5)
    console.log(repoIndex)
  })
})
