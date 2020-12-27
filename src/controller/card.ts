import {
  _,
  Card,
  Controller,
  RestApiRequest, RestApiResponse,
  CardRepository
} from '../index'

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
    let status = 200
    let index = await repo.getIndex()
    if (_.isError(index)) {
      status = 404
      index = {
        error: true,
        message: index.toString()
      }
    }
    return res.send(index, status)
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
    let status = 200
    let card = await repo.get(id)
    if (_.isError(card)) {
      status = 404
      card = {
        error: true,
        message: card.toString()
      }
    }
    return res.send(card, status)
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
    let card: any = new Card(data)
    const repoStatus = await repo.persist(card)
    let status = 200
    if (_.isError(repoStatus)) {
      status = 404
      card = {
        error: true,
        message: repoStatus.toString()
      }
    }
    return res.send(card, status)
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
    let card = await repo.get(id)
    if (_.isError(card)) {
      status = 404
      card = {
        error: true,
        message: card.toString()
      }
    } else {
      const data = await req.getBody()
      card.mapDataOnEntity(data)
      const repoStatus = await repo.persist(card)
      if (_.isError(repoStatus)) {
        status = 404
        card = {
          error: true,
          message: repoStatus.toString()
        }
      }
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
