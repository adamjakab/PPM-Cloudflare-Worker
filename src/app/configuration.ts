import { getPPMConfigKV } from '../global'
import * as _ from '../util/lodash'

const defaultApplicationConfig = {
  log_to_console: false,
  cache_config: false,
  storage_to_use: 'memory',
  shared_key: ''
}

export class AppConfiguration {
  private readonly projectConfig: any
  private readonly applicationConfig: any

  public constructor () {
    this.projectConfig = require('../../package.json')
    this.applicationConfig = defaultApplicationConfig
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
  public mergeProjectConfigOverrides () {
    const projectOverrideConfig = this.getProjectConfigValue('ppm-config', {})
    _.extend(this.applicationConfig, projectOverrideConfig)
  }

  /**
   *  Merge config from KV Storage: PPMConfigKV
   */
  public async mergeKVStorageOverrides (): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      const PPMConfigKV = getPPMConfigKV()
      if (_.isUndefined(PPMConfigKV)) {
        return reject(new Error('PPMConfigKV is not defined!'))
      }

      const configKeys = _.keys(this.applicationConfig)
      const promises: any[] = []

      _.each(configKeys, (key) => {
        promises.push(PPMConfigKV.get(key))
      })

      Promise.all(promises).then((results) => {
        _.each(configKeys, (key) => {
          const val = _.head(_.pullAt(results, 0))
          if (!_.isUndefined(val) && !_.isNull(val)) {
            _.set(this.applicationConfig, key, val)
          }
        })
        resolve()
      }).catch(e => {
        reject(e)
      })
    })
  }
}
