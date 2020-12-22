import {
  RawRouteItem,
  CardController
} from '../index'

/**
 * Export a simple table of routes to be handled by the controller
 */
export const CardRoutingTable: RawRouteItem[] = [
  { path: '/', method: 'GET', callback: CardController.list },
  { path: '/:id', method: 'GET', callback: CardController.getOne },
  { path: '/', method: 'POST', callback: CardController.create },
  { path: '/:id', method: 'PUT', callback: CardController.update },
  { path: '/:id', method: 'DELETE', callback: CardController.delete }
]
