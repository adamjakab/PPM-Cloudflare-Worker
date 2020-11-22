import { Platform } from '../util/platform'
import { RestApiRequest } from './request'
import _ from 'lodash'

export class RestApiResponse {
  public request: RestApiRequest

  constructor (request: RestApiRequest) {
    this.request = request
  }

  public send (data: any, status = 200) {
    if (status !== 200) {
      Platform.log('R[' + status + ']: ', data)
    }

    const convertedData = this.convertData(data)

    const headers = _.extend({
      'content-type': 'text/plain'
    }, convertedData.headers)
    // Platform.log('H: ', JSON.stringify(headers))

    return new Response(convertedData.body, {
      status: status,
      headers: headers
    })
  }

  protected stringifyObject (data: any) {
    return _.isFunction(data.toJson) ? data.toJson() : JSON.stringify(data)
  }

  protected stringifyArray (data: any) {
    return '[' + _.join(_.map(data, this.stringifyObject)) + ']'
  }

  /**
   * @param data
   */
  protected convertData (data: any) {
    // Ensure that data is an array of objects
    if (!_.isArray(data)) {
      if (!_.isObject(data)) {
        data = { data: data }
      }
      data = [data]
    }
    return {
      body: this.stringifyArray(data),
      headers: {
        'content-type': 'application/json'
      }
    }
  }
}
