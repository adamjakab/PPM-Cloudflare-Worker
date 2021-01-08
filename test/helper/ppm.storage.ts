import { CloudflareWorkerKVOptions } from 'types-cloudflare-worker'
import { getRandomKVStoreData } from './test.helper'
import _ from 'lodash'

/**
 * Create a mock PpmStorage and add it to the global scope for the application
 * @param cfg
 */
export const createGlobalPpmStorageKV = (cfg: any = {}): PpmStorage => {
  const getGlobal = (): any => {
    return global
  }
  const globalScope = getGlobal()
  globalScope.PPMStorageKV = new PpmStorage(cfg)
  return globalScope.PPMStorageKV
}

/**
 * Cloudflare KV Storage Mock
 */
export class PpmStorage {
  private _timesCalledGet: number
  private _timesCalledPut: number
  private _timesCalledDel: number
  private _datastore = {}

  public constructor (cfg: any = {}) {
    this.reset(cfg)
  }

  public reset (cfg: any) {
    let storageData = {}
    if (_.has(cfg, 'data_file')) {
      storageData = require(_.get(cfg, 'data_file'))
    } else {
      // @todo: get random data from test helper
      storageData = getRandomKVStoreData(5)
    }

    // Pass in a custom callback for 'get'
    if (_.has(cfg, 'call_get')) {
      this.get = _.get(cfg, 'call_get')
    }
    // Pass in a custom callback for 'put'
    if (_.has(cfg, 'call_put')) {
      this.put = _.get(cfg, 'call_put')
    }
    // Pass in a custom callback for 'delete'
    if (_.has(cfg, 'call_delete')) {
      this.delete = _.get(cfg, 'call_delete')
    }
    this._datastore = storageData
    this._timesCalledGet = 0
    this._timesCalledPut = 0
    this._timesCalledDel = 0
  }

  public get (
    _key: string,
    _type?: 'text' | 'json' | 'arrayBuffer' | 'stream'
  ): Promise<string | any | ArrayBuffer | ReadableStream> {
    this._timesCalledGet++
    return Promise.resolve(_.get(this._datastore, _key, null))
  }

  public put (
    _key: string,
    _value: string | ReadableStream | ArrayBuffer | FormData,
    _options?: CloudflareWorkerKVOptions
  ): Promise<void> {
    if (_.isString(_value)) {
      _value = JSON.parse(_value)
    }
    _.set(this._datastore, _key, _value)
    this._timesCalledPut++
    return Promise.resolve()
  }

  public delete (
    _key: string
  ): Promise<void> {
    _.unset(this._datastore, _key)
    this._timesCalledDel++
    return Promise.resolve()
  }

  public get timesCalledGet (): number {
    return this._timesCalledGet
  }

  public get timesCalledPut (): number {
    return this._timesCalledPut
  }

  public get timesCalledDel (): number {
    return this._timesCalledDel
  }

  public get datastore (): any {
    return this._datastore
  }
}
