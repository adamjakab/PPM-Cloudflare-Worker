import { bootstrapApplicationForTest } from '../../helper/test.app.setup'

/**
 * @group unit/repository
 * @group _incomplete
 */
describe('Card Repository', () => {
  let appIndex: any, ppmConfig: any, ppmStorage: any
  beforeEach(() => {
    const envData = bootstrapApplicationForTest()
    appIndex = envData.appIndex
    ppmConfig = envData.ppmConfig
    ppmStorage = envData.ppmStorage
  })

  it('should extend Repository', () => {
    const repo = new appIndex.CardRepository()
    expect(repo).toBeInstanceOf(appIndex.Repository)
  })

  /*
  it('[getIndex] should return the storage index ', async () => {
    ppmStorage.reset({
      data_file: '../data/storage.data.default.json'
    })
    const repo = new appIndex.CardRepository()
    const repoIndex = await repo.getIndex()
    expect(repoIndex).toBeInstanceOf(Array)
    expect(repoIndex).toHaveLength(2)
    expect(repoIndex).toEqual(ppmStorage.datastore.index)
  })

  it('[persist] should store the entity', async () => {
    ppmStorage.reset({
      data_file: '../data/storage.data.empty.json'
    })
    const data = {
      name: getRandomString(32),
      type: getRandomString(8),
      identifier: getRandomString(16)
    }
    const repo = new appIndex.CardRepository()
    const card = new appIndex.Card(data)
    await repo.persist(card)
    expect(ppmStorage.datastore.index).toHaveLength(1)
    const indexElement = ppmStorage.datastore.index[0]
    expect(indexElement).toHaveProperty('id')
    expect(indexElement).toHaveProperty('name')
    expect(indexElement).toHaveProperty('type')
    expect(indexElement).toHaveProperty('identifier')
    expect(indexElement.name).toEqual(data.name)
    expect(indexElement.type).toEqual(data.type)
    expect(indexElement.identifier).toEqual(data.identifier)
    const elementID = indexElement.id
    const storedElement = ppmStorage.datastore[elementID]
    expect(storedElement.name).toEqual(data.name)
    expect(storedElement.type).toEqual(data.type)
    expect(storedElement.identifier).toEqual(data.identifier)
  })

  it('[persist] should store multiple entities', async () => {
    ppmStorage.reset({
      data_file: '../data/storage.data.empty.json'
    })
    const repo = new appIndex.CardRepository()
    const cnt = Math.floor(Math.random() * 128)
    for (let i = 0; i < cnt; i++) {
      const data = {
        name: 'card-' + i + '-' + getRandomString(32),
        type: getRandomString(8),
        identifier: getRandomString(16)
      }
      await repo.persist(new appIndex.Card(data))
    }
    expect(ppmStorage.datastore.index.length).toEqual(cnt)
  })

  it("should create id(uuidv4) automatically", () => {
    const repo = new Repository();
    const d = { name: getRandomString() };
    const entity = new Entity(d);
    repo.add(entity);
    expect(entity.id).toBeDefined();
    expect(_.isString(entity.id)).toBeTruthy();
    expect(uuidValidate(entity.id as string)).toBeTruthy();
    expect(uuidVersion(entity.id as string)).toEqual(4);
  });

  it("should create id(numeric) automatically", () => {
    const repo = new Repository();
    const d = { name: getRandomString() };
    const entity = new Entity(d, "numeric");
    repo.add(entity);
    expect(entity.id).toBeDefined();
    expect(_.isNumber(entity.id)).toBeTruthy();
    expect(entity.id).toEqual(0);
    //
    const entity2 = new Entity(d, "numeric");
    repo.add(entity2);
    expect(entity2.id).toBeDefined();
    expect(_.isNumber(entity2.id)).toBeTruthy();
    expect(entity2.id).toEqual(1);
  });

  it("should return the correct entity by index", () => {
    const repo = new Repository();
    const d = { name: getRandomString() };
    const entity = new Entity(d);
    repo.add(entity);
    //
    const entity2 = repo.getByIndex(0);
    expect(entity2).toBeInstanceOf(Entity);
    expect(entity2).toMatchObject(entity);
    expect(entity2).toEqual(entity);
  });

  it("should return the correct entity by id", () => {
    const repo = new Repository();
    const id = generateUUIDv4();
    const d = { id: id, name: getRandomString() };
    const entity = new Entity(d);
    repo.add(entity);
    //
    const entity2 = repo.get(id);
    expect(entity2).toBeInstanceOf(Entity);
    expect(entity2).toMatchObject(entity);
    expect(entity2).toEqual(entity);
  });

  it("should delete the correct entity by id", () => {
    const repo = new Repository();
    const e1 = new Entity({ name: getRandomString() });
    repo.add(e1);
    const e2 = new Entity({ name: getRandomString() });
    repo.add(e2);
    const e3 = new Entity({ name: getRandomString() });
    repo.add(e3);
    //
    const id = e2.id;
    const removed = _.first(repo.delete(id));
    //
    expect(removed).toMatchObject(e2);
    expect(removed).toEqual(e2);
    //
    expect(repo.count()).toEqual(2);
    const entityList = repo.getAll();
    expect(entityList.length).toEqual(2);
    //
    expect(entityList[0]).toMatchObject(e1);
    expect(entityList[0]).toEqual(e1);
    //
    expect(entityList[1]).toMatchObject(e3);
    expect(entityList[1]).toEqual(e3);
  });
   */
})
