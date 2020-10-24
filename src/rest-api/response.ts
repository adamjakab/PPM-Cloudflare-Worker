import { RestApiRequest } from './request';

export class RestApiResponse {
  public request: RestApiRequest;

  constructor(request: RestApiRequest) {
    this.request = request;
  }

  public send(data: object, status = 200) {
    return new Response(JSON.stringify(data), {
      status,
      headers: {
        'content-type': 'application/json',
        'ppm-sequence': '1999',
      },
    });
  }
}
