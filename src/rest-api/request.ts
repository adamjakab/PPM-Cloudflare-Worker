import { RouteElementLayout } from '../interface/route_element'
// import URLParse from "url-parse";

export class RestApiRequest {
  protected request: Request;

  /** @var {{message, id}} */
  protected validRoute: RouteElementLayout | undefined;

  constructor (request: Request) {
    this.request = request
    this.validRoute = undefined
    this.elaborateRequest()
  }

  public setValidRoute (route: RouteElementLayout) {
    // tslint:disable: no-console
    console.log('Setting valid route for request:', route)
    this.validRoute = route
  }

  public getValidRoute () {
    return this.validRoute
  }

  public async getBody () {
    try {
      return await this.request.json()
    } catch (error) {
      return {}
    }
  }

  public getUrl = () => {
    return this.request.url
  };

  public getPath = () => {
    return (
      '/' +
      this.getUrl()
        .split('/')
        .slice(3)
        .join('/')
        .split('?')[0]
    )
  };

  /**
   * @returns {{}}
   */
  public getParams = () => {
    let answer: any = {}
    if (this.validRoute) {
      answer = this.validRoute.dynamicRoute.match(this.getPath())
    }
    return answer
  };

  public getMethod = () => {
    return this.request.method
  };

  private elaborateRequest () {
    // do something like register path / params
    // const url = new URLParse(this.getUrl());
    // console.log("Parsed URL: " + JSON.stringify(url));
  }
  /*
  query() {
        try {
            let query = {}
            let queryString = this.request.url.split('?')[1]

            queryString.split('&').forEach(el => {
                const temp = el.split('=')
                if (temp.length === 2) {
                    query[temp[0]] = temp[1]
                }
            })
            return query
        } catch (error) {
            return {}
        }
    }
  */
}
