import { _, Globals, Platform } from '../index'

const defaultApplicationConfig = {
  log_to_console: false,
  cache_config: false,
  storage_to_use: 'kvstore',
  shared_key: ''
}

export class AppConfiguration {
  private _isKVStorageMerged: boolean
  private readonly projectConfig: any
  private readonly applicationConfig: any

  public constructor () {
    this._isKVStorageMerged = false
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

  private get isKVStorageMerged (): boolean {
    return this._isKVStorageMerged
  }

  private set isKVStorageMerged (value: boolean) {
    this._isKVStorageMerged = value
  }

  /**
   *  Merge configuration from package.json (key: "ppm-config")
   */
  public mergeProjectConfigOverrides () {
    const projectOverrideConfig = this.getProjectConfigValue('ppm-config', {})
    _.extend(this.applicationConfig, projectOverrideConfig)
  }

  /**
   *  Merge configuration from KV Storage: PPMConfigKV
   */
  public async mergeKVStorageOverrides (): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      if (this.isKVStorageMerged) {
        return resolve()
      }
      const PPMConfigKV = Globals.getPPMConfigKV()
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
        this.isKVStorageMerged = true
        Platform.log('Application Config: ', this.getAppConfig())
        resolve()
      }).catch(e => {
        reject(e)
      })
    })
  }
}
