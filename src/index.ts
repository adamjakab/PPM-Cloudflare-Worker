import CloudflareWorkerGlobalScope from 'types-cloudflare-worker'

// Utils
import * as _ from './util/lodash'
import { InstanceCreator } from './util/instance-creator'
import * as Utils from './util/utils'

// Interfaces
import { RawRouteItem, RouteElementLayout } from './interface/route_element'
import { StorageIndexItem } from './interface/storage.index'

// Metadata
import { MetadataStorage } from './metadata/metadata-storage'

// Globals
import * as Globals from './util/global'

// Decorators
import { EntityDecorator } from './decorator/entity.decorator'

// Entity
import EntityManager from './repository/entity-manager'
import { Repository } from './repository/repository'
import { CardRepository } from './repository/card.repository'
import { Entity } from './entity/entity'
import { Card } from './entity/card'

// Storage
import { KVStore } from './storage/KVStore'

// Rest API
import { RestApiWorker } from './rest-api'
import { RestApiRequest } from './rest-api/request'
import { RestApiResponse } from './rest-api/response'

// Platform
import { Platform } from './util/platform'

// Controllers
import { Controller } from './controller/controller'
import { RootController } from './controller/root'
import { CardController } from './controller/card'

// Routing
import { CardRoutingTable } from './router/card'

// Application
import { AppConfiguration } from './app/configuration'
import { CloudflareWorkerApp } from './app/workerApp'

// Declare self
declare let self: CloudflareWorkerGlobalScope

// only create the app instance but do not do anything else - allow export to happen first
const app = new CloudflareWorkerApp()

export {
  app,
  _, InstanceCreator, Utils,
  Globals,
  Controller, RootController, CardController,
  Entity, Card,
  Repository, CardRepository,
  CardRoutingTable,
  EntityManager,
  KVStore,
  RestApiWorker,
  Platform,
  AppConfiguration,
  RawRouteItem, RouteElementLayout, StorageIndexItem,
  RestApiRequest, RestApiResponse,
  MetadataStorage,
  EntityDecorator
}

// init app
// app.run()

try {
  self.addEventListener('fetch', (fetchEvent: FetchEvent) => {
    fetchEvent.respondWith(app.handle(fetchEvent))
  })
} catch (e) {
  // console.warn('Failed to register listener!', e)
}
