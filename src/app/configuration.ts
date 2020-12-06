import { CloudflareWorkerKV } from 'types-cloudflare-worker'
import { getPPMConfigKV } from '../global'
import * as _ from '../util/lodash'

const defaultApplicationConfig = {
  log_to_console: true,
  cache_config: true,
  storage_to_use: 'memory',
  shared_key: ''
}

class AppConfiguration {
  private readonly projectConfig: any
  private readonly applicationConfig: any

  public constructor () {
    this.projectConfig = require('../../package.json')
    this.applicationConfig = defaultApplicationConfig
    this.mergeProjectConfigOverrides()
  }

  public getAppConfigValue (path: string, defaultValue: any = undefined) {
    return _.get(this.applicationConfig, path, defaultValue)
  }

  public getAppConfig () {
    return this.applicationConfig
  }

  public getProjectConfigValue (path: string, defaultValue: any = undefined) {
    return _.get(this.projectConfig, path, defaultValue)
  }

  public getProjectConfig () {
    return this.projectConfig
  }

  /**
   *  Merge config from Project Config (ppm-config key in package.json)
   */
  protected mergeProjectConfigOverrides () {
    const projectOverrideConfig = this.getProjectConfigValue('ppm-config', {})
    _.extend(this.applicationConfig, projectOverrideConfig)
  }

  public mergeKVStorageOverrides () {
    return true
  }
}

// Singleton export
export = new AppConfiguration()
