import { createRoute as createTypedRoute } from 'typed-routes'
import {
  _,
  Platform,
  RestApiRequest,
  RestApiResponse,
  RawRouteItem,
  RouteElementLayout
} from '../index'

export class RestApiWorker {
  private routes: any
  private validMethods = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE']

  constructor () {
    this.routes = []
  }

  /**
   * The main method that handles the incoming request
   *
   * @param event
   */
  public async handle (event: FetchEvent) {
    const request = new RestApiRequest(event.request)
    const response = new RestApiResponse(request)

    this.findRouteForRequest(request)
    const route = request.getValidRoute()

    if (_.isUndefined(route)) {
      return response.send({ status: 0, message: 'Shit hit the fan!' }, 404)
    }

    return await route.callback(request, response)
  }

  /**
   * @todo: this should use the RawRouteItem as parameter
   * @param path
   * @param method
   * @param callback
   */
  public register (path: string, method: string, callback: any) {
    if (!this.validMethods.includes(method)) {
      Platform.logError('Cannot register invalid method: ' + method + '!')
      return
    }

    // Platform.log('PATH: ' + path);
    let dynamicRoute = createTypedRoute()
    if (path === '/') {
      dynamicRoute = dynamicRoute.extend('')
    } else {
      const pathParts = path.split('/')
      _.each(pathParts, (pathPart: string) => {
        if (!_.isEmpty(pathPart)) {
          if (pathPart.startsWith(':')) {
            // ":id" => "id"
            dynamicRoute = dynamicRoute.param(pathPart.substring(1))
          } else {
            dynamicRoute = dynamicRoute.extend(pathPart)
          }
        }
      })
      // Platform.log('>PATH(TS): ' + dynamicRoute.toString());
    }

    const routeElement: RouteElementLayout = {
      path: path,
      dynamicRoute: dynamicRoute,
      method: method,
      callback: callback
    }

    Platform.log('Registered route: ' + JSON.stringify(routeElement))
    this.routes.push(routeElement)
  }

  public useRoutingTable (path: string, rt: RawRouteItem[]) {
    // Platform.log('Routing Table: ', rt)
    _.each(rt, (routeItem: RawRouteItem) => {
      this.register(
        path + (routeItem.path === '/' ? '' : routeItem.path),
        routeItem.method,
        routeItem.callback
      )
    })
  }

  public getRoutes = () => {
    return this.routes
  };

  private findRouteForRequest (request: RestApiRequest) {
    Platform.log(
      'Finding route for request: ',
      request.getMethod(),
      request.getPath()
    )

    const validRoute = _.find(this.routes, (route: RouteElementLayout) => {
      return (
        route.method === request.getMethod() &&
        route.dynamicRoute.match(request.getPath())
      )
    })

    request.setValidRoute(validRoute)
  }
}
