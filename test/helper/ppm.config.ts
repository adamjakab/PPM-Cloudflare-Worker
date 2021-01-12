import _ from 'lodash'
import { CloudflareWorkerKVOptions } from 'types-cloudflare-worker'
import { PpmStorage } from './ppm.storage'

/**
 * Create a mock PpmConfig and add it to the global scope for the application
 * @param cfg
 */
export const createGlobalPpmConfigKV = (cfg:any = {}): PpmConfig => {
  const getGlobal = (): any => {
    return global
  }
  const globalScope = getGlobal()
  globalScope.PPMConfigKV = new PpmConfig(cfg)
  return globalScope.PPMConfigKV
}

class PpmConfig {
  private _timesCalledGet: number
  private _timesCalledPut: number
  private config: any = {}

  public constructor (cfg:any = {}) {
    _.extend(this.config, cfg)
    this._timesCalledGet = 0
    this._timesCalledPut = 0
  }

  public get (
    _key: string,
    _type?: 'text' | 'json' | 'arrayBuffer' | 'stream'
  ): Promise<string | any | ArrayBuffer | ReadableStream> {
    this._timesCalledGet++
    return Promise.resolve(_.get(this.config, _key, null))
  }

  public put (
    _key: string,
    _value: string | ReadableStream | ArrayBuffer | FormData,
    _options?: CloudflareWorkerKVOptions
  ): Promise<void> {
    _.set(this.config, _key, _value)
    this._timesCalledPut++
    return Promise.resolve()
  }

  public get timesCalledGet (): number {
    return this._timesCalledGet
  }

  public get timesCalledPut (): number {
    return this._timesCalledPut
  }
}
