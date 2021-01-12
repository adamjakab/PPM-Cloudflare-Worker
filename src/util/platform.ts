import { app } from '../index'

/**
 * Platform
 */
export class Platform {
  /**
   * Log any message
   */
  public static log (...args: any[]) {
    if (app.appConfig.getAppConfigValue('log_to_console', false)) {
      console.log(...args)
    }
  }

  /**
   * Log any message as error
   */
  public static logError (...args: any[]) {
    if (app.appConfig.getAppConfigValue('log_to_console', false)) {
      console.error(...args)
    }
  }
}
