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
   * @param args
   */
  public static log (...args: any[]) {
    console.log(...args)
  }

  public static warn (...args: any[]) {
    Platform.log('WARNING: ', ...args)
  }
}
