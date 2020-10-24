import * as _ from 'lodash';
import { RestApiRequest } from './request';
import { RestApiResponse } from './response';

// tslint:disable: no-console
export class RestApiWorker {
  private routes: any = [];
  private validMethods = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'ANY'];

  constructor() {
    this.routes = [];
  }

  public async handle(event: FetchEvent) {
    const request = new RestApiRequest(event.request);
    const response = new RestApiResponse(request);

    const method = request.getMethod();
    const path = request.getPath();

    console.log('Handling request: ', method, path);

    const route = this.findRouteFor(path, method);

    if (route) {
      console.log('Found registered Route: ', route);
      return await route.callback(request, response);
    }

    return response.send({ status: 0, message: 'Shit hit the fanZ!' }, 404);
  }

  public register(path: string, method: string, callback: any) {
    if (!this.validMethods.includes(method)) {
      // tslint:disable-next-line: no-console
      console.error('Cannot register invalid method: ' + method + '!');
      return;
    }
    this.routes.push({
      path,
      method,
      callback,
    });
  }

  public useRouter(path: string, router: any) {
    _.each(router.getRoutes(), (route: any) => {
      this.register(
        path + (route.path === '/' ? '' : route.path),
        route.method,
        route.callback,
      );
    });
  }

  public getRoutes = () => {
    return this.routes;
  };

  private findRouteFor(path: string, method: string) {
    let validRoute = _.find(this.routes, (r: any) => {
      return this.routeCheck(r.path, path) && r.method === method;
    });

    if (_.isUndefined(validRoute)) {
      validRoute = _.find(this.routes, (r: any) => {
        return this.routeCheck(r.path, path) && r.method === 'ANY';
      });
    }

    if (_.isUndefined(validRoute)) {
      validRoute = false;
    }

    return validRoute;
  }

  /**
   * @todo: restructure
   * @param route
   * @param requestRoute
   */
  private routeCheck(route: string, requestRoute: string) {
    // implementing route params

    // split actual route from this.routes
    // and the route from the request
    const routeArray = route.split('/');
    const requestRouteArray = requestRoute.split('/');

    if (routeArray.length !== requestRouteArray.length) {
      return false;
    }

    try {
      let flag = true;
      // compare each element from both routes
      routeArray.forEach((elem, index) => {
        // check if we have url parameters
        // and if there is actually a value in request url
        // then insert to request.params
        if (
          elem.includes(':') &&
          requestRouteArray[index] &&
          requestRouteArray[index] !== ''
        ) {
          // @todo: the below line is commented - very messy!!!
          // this.request.params[elem.substring(1)] = requestRouteArray[index]
          // @todo: the above line is commented - very messy!!!
        } else {
          if (elem !== requestRouteArray[index]) {
            flag = false;
            return;
          }
        }
      });
      return flag;
    } catch (error) {
      return false;
    }
  }
}
