import * as _ from 'lodash'
import { Platform } from '../../src/util/platform'
import { CloudflareWorkerGlobalScope } from 'types-cloudflare-worker'
// import EntityManager from '../../src/repository/entity-manager';
import { NoteRepository } from '../../src/repository/note-repository'
import { Note } from '../../src/entity/note'

declare let self: CloudflareWorkerGlobalScope

describe('Test', () => {
  it('should work', () => {
    expect(true).toBeTruthy()
  })
})
