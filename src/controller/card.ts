import * as _ from '../util/lodash'
import { Card } from '../entity/card'
import { Controller } from './controller'
import { RestApiRequest } from '../rest-api/request'
import { RestApiResponse } from '../rest-api/response'
import { CardRepository } from '../repository/card.repository'

class CardController extends Controller {
  /**
   * Path: /cards (GET)
   * It will return the index and not the full item list
   *
   * @param req
   * @param res
   */
  public async list (req: RestApiRequest, res: RestApiResponse) {
    const repo = new CardRepository()
    const index = await repo.getIndex()
    return res.send(index)
  }

  /**
   * Path: /cards/{id} (GET)
   *
   * @param req
   * @param res
   */
  public async getOne (req: RestApiRequest, res: RestApiResponse) {
    const { id } = req.getParams()
    const repo = new CardRepository()
    const card: Card = await repo.get(id)
    return res.send(card, card ? 200 : 404)
  }

  /**
   * Path: /cards (POST)
   *
   * @param req
   * @param res
   */
  public async create (req: RestApiRequest, res: RestApiResponse) {
    const data = await req.getBody()
    const repo = new CardRepository()
    const card = new Card(data)
    await repo.persist(card)
    return res.send(card, card ? 200 : 404)
  }

  /**
   * Path: /cards/{id} (PUT)
   *
   * @param req
   * @param res
   */
  public async update (req: RestApiRequest, res: RestApiResponse) {
    let status = 200
    const { id } = req.getParams()
    const repo = new CardRepository()
    const card: Card = await repo.get(id)
    if (card) {
      const data = await req.getBody()
      card.mapDataOnEntity(data)
      await repo.persist(card)
    } else {
      status = 404
    }
    return res.send(card, status)
  }

  /**
   * Path: /cards/{id} (DELETE)
   *
   * @param req
   * @param res
   */
  public async delete (req: RestApiRequest, res: RestApiResponse) {
    let status = 200
    const { id } = req.getParams()
    const repo = new CardRepository()
    const card: Card = await repo.get(id)
    if (card) {
      await repo.remove(card)
    } else {
      status = 404
    }
    return res.send(card, status)
  }
}

// Singleton export
export = new CardController()
