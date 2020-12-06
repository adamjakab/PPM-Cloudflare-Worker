import { CloudflareWorkerKV } from 'types-cloudflare-worker'
import * as _ from '../util/lodash'

const defaultApplicationConfig = {
  log_to_console: true,
  cache_config: true,
  storage_to_use: 'memory'
}

class AppConfiguration {
  private readonly projectConfig:any
  private readonly applicationConfig:any

  public constructor () {
    this.projectConfig = require('../../package.json')
    this.applicationConfig = defaultApplicationConfig
  }

  public getAppConfigValue (path:string, defaultValue:any = undefined) {
    return _.get(this.applicationConfig, path, defaultValue)
  }

  public getAppConfig () {
    return this.applicationConfig
  }

  public getProjectConfigValue (path:string, defaultValue:any = undefined) {
    return _.get(this.projectConfig, path, defaultValue)
  }

  public getProjectConfig () {
    return this.projectConfig
  }

  public mergeAppConfigOverrides () {
    // Get override from Project Config (ppm-config key in package.json)
    const projectOverrideConfig = this.getProjectConfigValue('ppm-config', {})
    _.extend(this.applicationConfig, projectOverrideConfig)
  }

  /*
  public async mergeAppConfigOverridesKV (): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      // Get override from Project Config (ppm-config key in package.json)
      const projectOverrideConfig = this.getProjectConfigValue('ppm-config', {})
      _.extend(this.applicationConfig, projectOverrideConfig)

      // Get override from KV Storage (PPMConfigKV)
      const globalScope = Platform.getGlobalVariable()
      const PPMConfigKV: CloudflareWorkerKV = globalScope.PPMConfigKV

      PPMConfigKV.get('log_to_console', 'text').then((val:any) => {
        _.set(this.applicationConfig, 'log_to_console', val === 'true')
        resolve()
      }).catch(e => {
        reject(e)
      })
    })
  }
   */
}

// Singleton export
export = new AppConfiguration()
