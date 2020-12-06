import * as _ from 'lodash'
import { Platform } from '../../src/util/platform'
import { CloudflareWorkerGlobalScope } from 'types-cloudflare-worker'
// import EntityManager from '../../src/repository/entity-manager';
import { NoteRepository } from '../../src/repository/note-repository'
import { Note } from '../../src/entity/note'
import { createRoute as createTypedRoute } from 'typed-routes'

declare let self: CloudflareWorkerGlobalScope

/**
 * @group _incomplete
 */
describe('Test', () => {
  it('should work', () => {
    expect(true).toBeTruthy()
  })

  it('should match root path', () => {
    let dynamicRoute = createTypedRoute()
    dynamicRoute = dynamicRoute.extend('')
    expect(dynamicRoute.match('/')).toBeDefined()
  })
})
