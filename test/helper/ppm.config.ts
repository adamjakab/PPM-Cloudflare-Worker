import _ from 'lodash'
import { CloudflareWorkerKVOptions } from 'types-cloudflare-worker'

export const createGlobalPpmConfigKV = (cfg:any = {}): PpmConfig => {
  const ppmConfig = new PpmConfig(cfg)
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  global.PPMConfigKV = ppmConfig
  return ppmConfig
}

export class PpmConfig {
  private _timesCalledGet: number
  private _timesCalledPut: number
  private readonly config: any = {}

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
    return Promise.resolve(_.get(this.config, _key))
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
