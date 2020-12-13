import _ from 'lodash'
import { CloudflareWorkerKVOptions } from 'types-cloudflare-worker'

export const createGlobalPpmStorageKV = (cfg: any = {}): PpmStorage => {
  const ppmStorage = new PpmStorage(cfg)
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  global.PPMStorageKV = ppmStorage
  return ppmStorage
}

class PpmStorage {
  private _timesCalledGet: number
  private _timesCalledPut: number
  private _datastore = {}

  public constructor (cfg: any = {}) {
    let storageData = {}
    if (_.has(cfg, 'data_file')) {
      storageData = require(_.get(cfg, 'data_file'))
    }
    this._datastore = storageData
    this._timesCalledGet = 0
    this._timesCalledPut = 0
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
    _.set(this._datastore, _key, _value)
    this._timesCalledPut++
    return Promise.resolve()
  }

  // delete

  // list

  public get timesCalledGet (): number {
    return this._timesCalledGet
  }

  public get timesCalledPut (): number {
    return this._timesCalledPut
  }

  public get datastore (): any {
    return this._datastore
  }
}
