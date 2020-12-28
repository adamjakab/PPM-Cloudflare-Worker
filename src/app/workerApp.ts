import {
  RootController,
  CardController,
  Card,
  EntityManager,
  KVStore,
  RestApiWorker,
  Platform,
  AppConfiguration
} from '../index'

export class CloudflareWorkerApp {
  private setupComplete: boolean
  private restApiWorker: RestApiWorker
  public appConfig: AppConfiguration

  public constructor () {
    this.setupComplete = false
    this.restApiWorker = new RestApiWorker()
    this.appConfig = new AppConfiguration()
  }

  public async handle (fetchEvent: FetchEvent) {
    await this.verifySetup()
    return this.restApiWorker.handle(fetchEvent)
  }

  public async verifySetup (): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      if (this.setupComplete) {
        resolve()
      } else {
        this.initializeAppConfiguration().then(() => {
          Platform.log('APP CONFIG: ', this.appConfig.getAppConfig())
          CloudflareWorkerApp.setupEntityManager()
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
    this.appConfig.mergeProjectConfigOverrides()
    await this.appConfig.mergeKVStorageOverrides()
  }

  private static setupEntityManager () {
    // Set up Entity Manager with the right storage
    EntityManager.setupStorageDriver(new KVStore())

    // Register Entities
    EntityManager.registerEntities([Card])
  }

  /**
   * @todo: implement decorator based routing
   * @private
   */
  private setupRoutes () {
    const rootController = new RootController()
    this.restApiWorker.register('/', 'GET', rootController.list)
    const cardController = new CardController()
    this.restApiWorker.register('/cards/', 'GET', cardController.list)
    this.restApiWorker.register('/cards/:id', 'GET', cardController.getOne)
    this.restApiWorker.register('/cards/', 'POST', cardController.create)
    this.restApiWorker.register('/cards/:id', 'PUT', cardController.update)
    this.restApiWorker.register('/cards/:id', 'DELETE', cardController.delete)
  }
}
