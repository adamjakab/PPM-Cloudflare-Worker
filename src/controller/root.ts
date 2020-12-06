import * as _ from '../util/lodash'
import { Controller } from './controller'
import { RestApiRequest } from '../rest-api/request'
import { RestApiResponse } from '../rest-api/response'
import AppConfiguration from '../app/configuration'

class RootController extends Controller {
  /**
   * Path: / (GET)
   *
   * @param req
   * @param res
   */
  public async list (req: RestApiRequest, res: RestApiResponse) {
    const reply = {
      name: AppConfiguration.getProjectConfigValue('name'),
      version: AppConfiguration.getProjectConfigValue('version')
    }

    return res.send(reply)
  }
}

// Singleton export
export = new RootController()
