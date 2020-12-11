import * as _ from '../util/lodash'
import RootController from '../controller/root'
import { Note } from '../entity/note'
import { routingTable as NoteRoutingTable } from '../router/note'
import EntityManager from '../repository/entity-manager'
import { KVStore } from '../storage/KVStore'
import { Memory } from '../storage/memory'
import { RestApiWorker } from '../rest-api'
import { Platform } from '../util/platform'
import { AppConfiguration } from './configuration'

export class CloudflareWorkerApp {
  private setupComplete: boolean
  private restApiWorker: RestApiWorker
  public appConfig: AppConfiguration

  public constructor () {
    this.setupComplete = false
    this.restApiWorker = new RestApiWorker()
  }

  public async handle (fetchEvent: FetchEvent) {
    await this.verifySetup()
    return this.restApiWorker.handle(fetchEvent)
  }

  private async verifySetup (): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      if (this.setupComplete) {
        resolve()
      } else {
        this.initializeAppConfiguration().then(() => {
          Platform.log('APP CONFIG: ', this.appConfig.getAppConfig())
          this.setupEntityManager()
          this.setupRoutes()
          this.setupComplete = true
          resolve()
        }).catch(e => {
          Platform.logError('APP CONFIG ERROR: ', e)
          reject(e)
        })
      }
    })
  }

  private async initializeAppConfiguration () {
    this.appConfig = new AppConfiguration()
    this.appConfig.mergeProjectConfigOverrides()
    await this.appConfig.mergeKVStorageOverrides()
  }

  private setupEntityManager () {
    // Set up Entity Manager with the right storage
    if (this.appConfig.getAppConfigValue('storage_to_use') === 'kvstore') {
      EntityManager.setupStorageDriver(new KVStore())
    } else {
      EntityManager.setupStorageDriver(new Memory())
      EntityManager.storage.resetTestData()
    }

    // @todo: move this to a separate method
    // Register Entities
    EntityManager.registerEntities([Note])
  }

  private setupRoutes () {
    this.restApiWorker.register('/', 'GET', RootController.list)
    this.restApiWorker.useRoutingTable('/notes', NoteRoutingTable)
  }
}
