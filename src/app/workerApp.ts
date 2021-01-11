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
  private _restApiWorker: RestApiWorker
  private readonly _appConfig: AppConfiguration
  private readonly _entityManager: EntityManager

  public constructor () {
    this._restApiWorker = new RestApiWorker()
    this._appConfig = new AppConfiguration()
    this._entityManager = new EntityManager()
  }

  public configure () {
    this._appConfig.mergeProjectConfigOverrides()
    this.setupEntityManager()
    this.setupRoutes()
    Platform.log('App initialized with config: ', this._appConfig.getAppConfig())
  }

  /**
   * Handles the incoming request
   *
   * Note: Since it is only possible to call async methods from inside the event listener call (i.e.: here),
   * the call to merge the configuration options from the KV storage must be called from this method
   */
  public async handle (fetchEvent: FetchEvent): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this._appConfig.mergeKVStorageOverrides().then(() => {
        return this._restApiWorker.handle(fetchEvent)
      }).then((response) => {
        resolve(response)
      }).catch((e) => {
        reject(e)
      })
    })
  }

  private setupEntityManager () {
    // Set up Entity Manager with the right storage
    this._entityManager.setupStorageDriver(new KVStore())

    // Register Entities
    this._entityManager.registerEntities([Card])
  }

  public get entityManager (): EntityManager {
    return this._entityManager
  }

  public get appConfig (): AppConfiguration {
    return this._appConfig
  }

  /**
   * Set up application routes
   *
   * @private
   */
  private setupRoutes () {
    const rootController = new RootController()
    this._restApiWorker.register('/', 'GET', rootController.list)
    const cardController = new CardController()
    this._restApiWorker.register('/cards/', 'GET', cardController.list)
    this._restApiWorker.register('/cards/:id', 'GET', cardController.getOne)
    this._restApiWorker.register('/cards/', 'POST', cardController.create)
    this._restApiWorker.register('/cards/:id', 'PUT', cardController.update)
    this._restApiWorker.register('/cards/:id', 'DELETE', cardController.delete)
  }
}
