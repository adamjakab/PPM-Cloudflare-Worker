import * as _ from 'lodash'
import { RestApiRequest } from './request'
import { RestApiResponse } from './response'
import { RouteElementLayout } from '../interface/route_element'
import { createRoute as RouteChecker } from 'typed-routes'

// tslint:disable: no-console
export class RestApiWorker {
  private routes: any;
  private validMethods = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'];

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

    if (route) {
      // console.log("Found registered Route: ", route);
      return await route.callback(request, response)
    }

    return response.send({ status: 0, message: 'Shit hit the fan!' }, 404)
  }

  public register (path: string, method: string, callback: any) {
    if (!this.validMethods.includes(method)) {
      // tslint:disable-next-line: no-console
      console.error('Cannot register invalid method: ' + method + '!')
      return
    }

    // console.log('______PATH: ' + path);
    let dynamicRoute = RouteChecker()
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
    // console.log('>PATH(TS): ' + dynamicRoute.toString());

    const routeElement: RouteElementLayout = {
      path: path,
      dynamicRoute: dynamicRoute,
      method: method,
      callback: callback
    }
    this.routes.push(routeElement)
  }

  public useRouter (path: string, router: any) {
    _.each(router.getRoutes(), (route: any) => {
      this.register(
        path + (route.path === '/' ? '' : route.path),
        route.method,
        route.callback
      )
    })
  }

  public getRoutes = () => {
    return this.routes
  };

  private findRouteForRequest (request: RestApiRequest) {
    console.log(
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
