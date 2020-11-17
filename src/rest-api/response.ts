import { RestApiRequest } from './request'

export class RestApiResponse {
  public request: RestApiRequest;
  private sequence: number = 0;

  constructor (request: RestApiRequest) {
    this.request = request
  }

  public send (data: object, status = 200) {
    this.sequence++
    return new Response(JSON.stringify(data), {
      status: status,
      headers: {
        'content-type': 'application/json',
        'ppm-sequence': this.sequence.toString()
      }
    })
  }
}
