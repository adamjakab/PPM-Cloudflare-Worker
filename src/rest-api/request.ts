import { RouteElementLayout } from '../interface/route_element';

export class RestApiRequest {
  protected request: Request;

  /** @var {{message, id}} */
  protected validRoute: RouteElementLayout | undefined;

  constructor(request: Request) {
    this.request = request;
    this.validRoute = undefined;
    this.elaborateRequest();
  }

  public setValidRoute(route: RouteElementLayout) {
    // tslint:disable: no-console
    console.log('Setting valid route for request:', route);
    this.validRoute = route;
  }

  public getValidRoute() {
    return this.validRoute;
  }

  public async body() {
    try {
      return await this.request.json();
    } catch (error) {
      return {}; // cases when body is null, but still json in content header
    }
  }

  public getUrl = () => {
    return this.request.url;
  };

  public getPath = () => {
    return (
      '/' +
      this.getUrl()
        .split('/')
        .slice(3)
        .join('/')
        .split('?')[0]
    );
  };

  /**
   * @returns {{}}
   */
  public getParams = () => {
    let answer: any = {};
    if (this.validRoute) {
      answer = this.validRoute.dynamicRoute.match(this.getPath());
    }
    return answer;
  };

  public getMethod = () => {
    return this.request.method;
  };

  private elaborateRequest() {
    // do something like register path / params
  }
}
