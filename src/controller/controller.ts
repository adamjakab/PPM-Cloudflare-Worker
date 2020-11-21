import { RestApiRequest } from '../rest-api/request'
import { RestApiResponse } from '../rest-api/response'

export class Controller {
  public async list (req: RestApiRequest, res: RestApiResponse) {
    return res.send({
      message: '[list] You asked to list all elements.',
      url: req.getUrl(),
      path: req.getPath(),
      params: req.getParams(),
      method: req.getMethod(),
      body: await req.getBody()
    })
  }

  public async getOne (req: RestApiRequest, res: RestApiResponse) {
    return res.send({
      message: '[getOne] You asked to get one element.',
      url: req.getUrl(),
      path: req.getPath(),
      params: req.getParams(),
      method: req.getMethod(),
      body: await req.getBody()
    })
  }

  public async create (req: RestApiRequest, res: RestApiResponse) {
    return res.send({
      message: '[create] You asked to create an element.',
      url: req.getUrl(),
      path: req.getPath(),
      params: req.getParams(),
      method: req.getMethod(),
      body: await req.getBody()
    })
  }

  public async update (req: RestApiRequest, res: RestApiResponse) {
    return res.send({
      message: '[update] You asked to update an element.',
      url: req.getUrl(),
      path: req.getPath(),
      params: req.getParams(),
      method: req.getMethod(),
      body: await req.getBody()
    })
  }

  public async delete (req: RestApiRequest, res: RestApiResponse) {
    return res.send({
      message: '[delete] You asked to delete an element.',
      url: req.getUrl(),
      path: req.getPath(),
      params: req.getParams(),
      method: req.getMethod(),
      body: await req.getBody()
    })
  }
}
