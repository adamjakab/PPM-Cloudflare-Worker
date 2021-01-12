import { setupTestEnvironment } from '../../helper/test.app.setup'
import { CloudflareWorkerGlobalScope } from 'types-cloudflare-worker'
import * as _ from 'lodash'

declare let self: CloudflareWorkerGlobalScope

/**
 * @group suite/block
 * @group incomplete
 */
describe('Platform', () => {
  let appIndex: any, ppmConfig: any, ppmStorage: any
  beforeEach(() => {
    return new Promise<void>((resolve, reject) => {
      setupTestEnvironment().then((envData) => {
        appIndex = envData.appIndex
        ppmConfig = envData.ppmConfig
        ppmStorage = envData.ppmStorage
        resolve()
      })
    })
  })

  it('should log messages to console if allowed by the configuration', () => {
    const spyConsoleLog = jest.spyOn(console, 'log').mockImplementation()
    const spyAppCfgValue = jest.spyOn(appIndex.app.appConfig, 'getAppConfigValue')
      .mockImplementation(() => {
        // log_to_console = true
        return true
      })
    appIndex.Platform.log('test')
    expect(console.log).toHaveBeenCalledTimes(1)
    spyConsoleLog.mockRestore()
    spyAppCfgValue.mockRestore()
  })

  it('should not log any messages to console if not allowed by the configuration', () => {
    const spyConsoleLog = jest.spyOn(console, 'log').mockImplementation()
    const spyAppCfgValue = jest.spyOn(appIndex.app.appConfig, 'getAppConfigValue')
      .mockImplementation(() => {
        // log_to_console = false
        return false
      })
    appIndex.Platform.log('test')
    expect(console.log).toHaveBeenCalledTimes(0)
    spyConsoleLog.mockRestore()
    spyAppCfgValue.mockRestore()
  })

  it('should log error messages to console if allowed by the configuration', () => {
    const spyConsoleLog = jest.spyOn(console, 'error').mockImplementation()
    const spyAppCfgValue = jest.spyOn(appIndex.app.appConfig, 'getAppConfigValue')
      .mockImplementation(() => {
        // log_to_console = true
        return true
      })
    appIndex.Platform.logError('test')
    expect(console.error).toHaveBeenCalledTimes(1)
    spyConsoleLog.mockRestore()
    spyAppCfgValue.mockRestore()
  })

  it('should not log any error messages to console if not allowed by the configuration', () => {
    const spyConsoleLog = jest.spyOn(console, 'error').mockImplementation()
    const spyAppCfgValue = jest.spyOn(appIndex.app.appConfig, 'getAppConfigValue')
      .mockImplementation(() => {
        // log_to_console = false
        return false
      })
    appIndex.Platform.logError('test')
    expect(console.error).toHaveBeenCalledTimes(0)
    spyConsoleLog.mockRestore()
    spyAppCfgValue.mockRestore()
  })
})
