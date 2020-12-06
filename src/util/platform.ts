/* tslint:disable:no-console */

/**
 * Platform
 */
export class Platform {
  /**
   * Gets global variable where global stuff can be stored.
   */
  public static getGlobalVariable (): any {
    return global
  }

  /**
   * Log any message
   */
  public static log (...args: any[]) {
    console.log(...args)
  }

  /**
   * Log any message as warning
   */
  public static logWarning (...args: any[]) {
    console.warn(...args)
  }

  /**
   * Log any message as error
   */
  public static logError (...args: any[]) {
    console.error(...args)
  }
}
