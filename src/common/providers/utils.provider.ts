import * as crypto from 'crypto';

export class UtilsProvider {
  /**
   * convert entity to dto class instance
   * @param {{new(entity: E, options: any): T}} model
   * @param {E[] | E} entity
   * @param options
   * @returns {T[] | T}
   */
  public static toDto<T, E>(
    model: new (entity: E, options?: GetConstructorArgs<T>[1]) => T,
    entity: E,
    options?: GetConstructorArgs<T>[1],
  ): T;
  public static toDto<T, E>(
    model: new (entity: E, options?: GetConstructorArgs<T>[1]) => T,
    entity: E[],
    options?: GetConstructorArgs<T>[1],
  ): T[];
  public static toDto<T, E>(
    model: new (entity: E, options?: GetConstructorArgs<T>[1]) => T,
    entity: E | E[],
    options?: GetConstructorArgs<T>[1],
  ): T | T[] {
    if (Array.isArray(entity)) {
      return entity.map((u) => new model(u, options));
    }

    return new model(entity, options);
  }

  /**
   * generate random string
   * @param length
   */
  static generateRandomString(length: number): string {
    return crypto.randomBytes(length).toString('base64');
  }

  /**
   * Encrypt password
   * @param password
   * @param salt password salt
   */
  static encryptPassword(password: string, salt: string): string {
    if (!password || !salt) {
      return '';
    }
    const tempSalt = Buffer.from(salt, 'base64');
    return (
      // 100 means iterating times 16means length
      crypto.pbkdf2Sync(password, tempSalt, 100, 16, 'sha1').toString('base64')
    );
  }

  /**
   * Check whether leap year
   * @param year
   */
  static isLeapYear(year) {
    return (year % 4 === 0 && year % 100 !== 0) || year % 400 == 0;
  }

  /**
   * Get the index of the date in the year
   * @param year
   * @param month
   * @param day
   */
  static getDays(year, month, day) {
    let days = day;

    //Month days
    const monthDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    for (let i = 0; i < month - 1; i++) {
      //the month index need minus 1
      days += monthDays[i];
    }

    //if leap year, need plus one
    if (UtilsProvider.isLeapYear(year) && month > 2) {
      days++;
    }
    return days++;
  }
  static isImage(mimeType: string): boolean {
    const imageMimeTypes = ['image/jpeg', 'image/png'];
    return imageMimeTypes.includes(mimeType);
  }
}
