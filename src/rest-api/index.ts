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
      return response.send({
        error: true,
        message: 'Route is not registered!',
        route: request.getPath(),
        method: request.getMethod()
      }, 404)
    }

    return await route.callback(request, response)
  }

  /**
   * Registers a route
   *
   * @param path
   * @param method
   * @param callback
   */
  public register (route: RawRouteItem) {
    if (!this.validMethods.includes(route.method)) {
      Platform.logError('Cannot register invalid method: ' + route.method + '!')
      return
    }

    let dynamicRoute = createTypedRoute()
    if (route.path === '/') {
      dynamicRoute = dynamicRoute.extend('')
    } else {
      const pathParts = route.path.split('/')
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
    }

    const routeElement: RouteElementLayout = {
      path: route.path,
      dynamicRoute: dynamicRoute,
      method: route.method,
      callback: route.callback
    }

    Platform.log('Registered route: ' + JSON.stringify(routeElement))
    this.routes.push(routeElement)
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
