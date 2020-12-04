import * as _ from '../util/lodash'
import { Controller } from './controller'
import { RestApiRequest } from '../rest-api/request'
import { RestApiResponse } from '../rest-api/response'

class RootController extends Controller {
  /**
   * Path: / (GET)
   *
   * @param req
   * @param res
   */
  public async list (req: RestApiRequest, res: RestApiResponse) {
    const reply = {
      name: 'cloudflare-ppm-worker',
      version: '0.0.2'
    }
    return res.send(reply)
  }
}

// Singleton export
export = new RootController()
