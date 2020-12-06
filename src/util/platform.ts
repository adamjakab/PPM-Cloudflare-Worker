import AppConfiguration from '../app/configuration'

/**
 * Platform
 */
export class Platform {
  /**
   * Log any message
   */
  public static log (...args: any[]) {
    if (AppConfiguration.getAppConfigValue('log_to_console', false)) {
      console.log(...args)
    }
  }

  /**
   * Log any message as warning
   */
  public static logWarning (...args: any[]) {
    if (AppConfiguration.getAppConfigValue('log_to_console', false)) {
      console.warn(...args)
    }
  }

  /**
   * Log any message as error
   */
  public static logError (...args: any[]) {
    if (AppConfiguration.getAppConfigValue('log_to_console', false)) {
      console.error(...args)
    }
  }
}
