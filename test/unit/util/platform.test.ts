import { bootstrapApplicationForTest } from '../../helper/test.app.setup'
import * as _ from 'lodash'

/**
 * @group unit/util
 * @group _incomplete
 */
describe('Platform', () => {
  let appIndex: any, ppmConfig: any, ppmStorage: any
  beforeEach(() => {
    const envData = bootstrapApplicationForTest()
    appIndex = envData.appIndex
    ppmConfig = envData.ppmConfig
    ppmStorage = envData.ppmStorage
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
