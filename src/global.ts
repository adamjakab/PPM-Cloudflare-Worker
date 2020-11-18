import { Platform } from './util/platform'
import { MetadataStorage } from './metadata/metadata-storage'

/**
 * Gets metadata args storage from global scope
 * This part of the application will be moved to a separate repository / package: tinyOrm
 */

export function getMetadataStorage (): MetadataStorage {
  const globalScope = Platform.getGlobalVariable()
  if (!globalScope.tinyOrmMetadataStorage) {
    globalScope.tinyOrmMetadataStorage = new MetadataStorage()
  }
  return globalScope.tinyOrmMetadataStorage
}
