import { RawRouteItem } from '../interface/route_element'
import Controller from '../controller/card'

/**
 * Export a simple table of routes to be handled by the controller
 */
export const routingTable: RawRouteItem[] = [
  { path: '/', method: 'GET', callback: Controller.list },
  { path: '/:id', method: 'GET', callback: Controller.getOne },
  { path: '/', method: 'POST', callback: Controller.create },
  { path: '/:id', method: 'PUT', callback: Controller.update },
  { path: '/:id', method: 'DELETE', callback: Controller.delete }
]
