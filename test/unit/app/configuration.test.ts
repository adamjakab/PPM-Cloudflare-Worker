import { createGlobalPpmConfigKV } from '../../helper/ppm.config'
import * as _ from 'lodash'

const ppmConfig = createGlobalPpmConfigKV({
  shared_key: '123',
  future_key: 'abc'
})

// Mock the index module
jest.mock(
  '../../../src/index',
  () => {
    // Mock Globals
    const Globals = {
      getPPMConfigKV: () => {
        return ppmConfig
      }
    }

    // Mock Platform
    const Platform = {
      log: (msg: string) => {
        console.log('MOCK LOG: ' + msg)
      }
    }

    // This is equivalent to export
    return {
      _,
      Globals,
      Platform
    }
  }
)

// eslint-disable-next-line import/first
import { AppConfiguration } from '../../../src/app/configuration'

/**
 * @group unit/app
 * @group _incomplete
 */
describe('Configuration', () => {
  let appConfiguration: any
  beforeAll(() => {
    //
  })

  beforeEach(() => {
    appConfiguration = new AppConfiguration()
  })

  it('should be cool', () => {
    // console.log(1)
  })

  it('should not have KV Storage merged initially', () => {
    expect(appConfiguration.isKVStorageMerged).toBeFalsy()
  })

  it('should have default Application config', () => {
    const cfg = appConfiguration.getAppConfig()
    expect(cfg).toBeDefined()
    expect(cfg).toHaveProperty('log_to_console')
    expect(cfg.log_to_console).toEqual(false)
    expect(cfg).toHaveProperty('shared_key')
    expect(cfg.shared_key).toEqual('')
  })

  it('should return Application config properties', () => {
    expect(appConfiguration.getAppConfigValue('log_to_console')).toEqual(false)
    expect(appConfiguration.getAppConfigValue('shared_key')).toEqual('')
    expect(appConfiguration.getAppConfigValue('non_existent')).toBeUndefined()
    expect(appConfiguration.getAppConfigValue('non_existent', 'def')).toEqual('def')
  })

  it('should have default Project config', () => {
    const cfg = appConfiguration.getProjectConfig()
    expect(cfg).toBeDefined()
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const pkgJson = require('../../../package.json')
    expect(cfg).toEqual(pkgJson)
  })

  it('should return specific Project config values', () => {
    const cfg = appConfiguration.getProjectConfig()
    const keys = ['name', 'version', 'author', 'license']
    _.each(keys, key => {
      const val = appConfiguration.getProjectConfigValue(key)
      expect(val).toEqual(_.get(cfg, key))
    })
  })

  it('should merge "ppm-config" values from package.json to application config', () => {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const pkgJson = require('../../../package.json')
    const appConfig = appConfiguration.getAppConfig()
    const packageJsonConfig = _.get(pkgJson, 'ppm-config')
    const mergedConfig = _.extend(appConfig, packageJsonConfig)
    appConfiguration.mergeProjectConfigOverrides()
    expect(appConfiguration.getAppConfig()).toEqual(mergedConfig)
  })

  it('should merge KV Storage values to application config', async () => {
    const appConfig = appConfiguration.getAppConfig()
    const kvStorageConfig = ppmConfig.config
    const mergedConfig = _.extend(appConfig, kvStorageConfig)
    await appConfiguration.mergeKVStorageOverrides()
    const newConfig = appConfiguration.getAppConfig()
    expect(newConfig).toEqual(mergedConfig)
  })

  it('should have KV Storage merged after mergeKVStorageOverrides()', async () => {
    await appConfiguration.mergeKVStorageOverrides()
    expect(appConfiguration.isKVStorageMerged).toBeTruthy()
  })
})
