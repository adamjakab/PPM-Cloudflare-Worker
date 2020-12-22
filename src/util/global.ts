import { CloudflareWorkerKV } from 'types-cloudflare-worker'
import { MetadataStorage } from '../index'

/**
 * Returns global variable
 */
export function getGlobalVariable (): any {
  return global
}

/**
 * Returns the KV Storage: "PPMConfigKV"
 */
export function getPPMConfigKV (): CloudflareWorkerKV {
  const globalScope = getGlobalVariable()
  return globalScope.PPMConfigKV
}

/**
 * Returns the KV Storage: "PPMStorageKV"
 */
export function getPPMStorageKV (): CloudflareWorkerKV {
  const globalScope = getGlobalVariable()
  return globalScope.PPMStorageKV
}

/**
 * Gets metadata args storage from global scope
 * This part of the application will be moved to a separate repository / package: tinyOrm
 * @todo: rethink this
 */
export function getMetadataStorage (): MetadataStorage {
  const globalScope = getGlobalVariable()
  if (!globalScope.tinyOrmMetadataStorage) {
    globalScope.tinyOrmMetadataStorage = new MetadataStorage()
  }
  return globalScope.tinyOrmMetadataStorage
}
