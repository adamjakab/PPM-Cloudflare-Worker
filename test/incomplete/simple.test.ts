import { CloudflareWorkerGlobalScope } from 'types-cloudflare-worker'
import { createRoute as createTypedRoute } from 'typed-routes'
import * as _ from 'lodash'
import { Platform } from '../../src/util/platform'
import EntityManager from '../../src/repository/entity-manager'
import { NoteRepository } from '../../src/repository/note-repository'
import { Note } from '../../src/entity/note'

declare let self: CloudflareWorkerGlobalScope

/**
 * @group incomplete
 */
describe('Simple Test', () => {
  it('should match root path', () => {
    let dynamicRoute = createTypedRoute()
    dynamicRoute = dynamicRoute.extend('')
    expect(dynamicRoute.match('/')).toBeDefined()
  })
})
