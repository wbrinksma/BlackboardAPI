/**
 * A class containing Miscellaneous functions.
 * @memberof BBBackend
 */
 export default abstract class Misc {
   /**
    * Get the current domain to use in urls
    * @returns {string}
    */
   public abstract getBlackboardDomain(): string;
 }
