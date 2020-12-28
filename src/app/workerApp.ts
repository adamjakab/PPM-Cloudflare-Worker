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
  // @fixme: we don't need this anymore
  private _setupComplete: boolean
  private _restApiWorker: RestApiWorker
  private _appConfig: AppConfiguration
  private _entityManager: EntityManager

  public constructor () {
    this._setupComplete = false
  }

  public initialize (): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this._restApiWorker = new RestApiWorker()
      this._appConfig = new AppConfiguration()
      this._entityManager = new EntityManager()
      return this.initializeAppConfiguration().then(() => {
        this.setupEntityManager()
        this.setupRoutes()
        this._setupComplete = true
        Platform.log('App initialized with config: ', this._appConfig.getAppConfig())
        resolve()
      })
    })
  }

  public handle (fetchEvent: FetchEvent) {
    return this._restApiWorker.handle(fetchEvent)
  }

  // @fixme: move this to AppConfiguration
  private async initializeAppConfiguration () {
    this._appConfig.mergeProjectConfigOverrides()
    await this._appConfig.mergeKVStorageOverrides()
  }

  private setupEntityManager () {
    // Set up Entity Manager with the right storage
    this._entityManager.setupStorageDriver(new KVStore())

    // Register Entities
    this._entityManager.registerEntities([Card])
  }

  public get setupComplete (): boolean {
    return this._setupComplete
  }

  public get entityManager (): EntityManager {
    return this._entityManager
  }

  public get appConfig (): AppConfiguration {
    return this._appConfig
  }

  /**
   * @todo: implement decorator based routing
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
