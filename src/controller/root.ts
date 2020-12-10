import * as _ from '../util/lodash'
import { Controller } from './controller'
import { RestApiRequest } from '../rest-api/request'
import { RestApiResponse } from '../rest-api/response'
import app from '../'

class RootController extends Controller {
  /**
   * Path: / (GET)
   *
   * @param req
   * @param res
   */
  public async list (req: RestApiRequest, res: RestApiResponse) {
    const reply = {
      name: app.appConfig.getProjectConfigValue('name'),
      version: app.appConfig.getProjectConfigValue('version')
    }

    return res.send(reply)
  }
}

// Singleton export
export = new RootController()
