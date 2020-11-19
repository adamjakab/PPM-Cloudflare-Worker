import { Platform } from '../util/platform'
import { RestApiRequest } from './request'

export class RestApiResponse {
  public request: RestApiRequest;
  private sequence = 0;

  constructor (request: RestApiRequest) {
    this.request = request
  }

  public send (data: any, status = 200) {
    this.sequence++
    Platform.log('Sending Data: ', data)
    return new Response(JSON.stringify(data), {
      status: status,
      headers: {
        'content-type': 'application/json',
        'ppm-sequence': this.sequence.toString()
      }
    })
  }
}
