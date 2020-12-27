import {
  RawRouteItem,
  CardController
} from '../index'

/**
 * @fixme: this requires the cardController to be created before the app is initialized
 * Export a simple table of routes to be handled by the controller
 */
const cardController = new CardController()
export const CardRoutingTable: RawRouteItem[] = [
  { path: '/', method: 'GET', callback: cardController.list },
  { path: '/:id', method: 'GET', callback: cardController.getOne },
  { path: '/', method: 'POST', callback: cardController.create },
  { path: '/:id', method: 'PUT', callback: cardController.update },
  { path: '/:id', method: 'DELETE', callback: cardController.delete }
]
