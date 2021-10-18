export declare class UtilsProvider {
    static toDto<T, E>(model: new (entity: E, options?: GetConstructorArgs<T>[1]) => T, entity: E, options?: GetConstructorArgs<T>[1]): T;
    static toDto<T, E>(model: new (entity: E, options?: GetConstructorArgs<T>[1]) => T, entity: E[], options?: GetConstructorArgs<T>[1]): T[];
    static generateRandomString(length: number): string;
    static encryptPassword(password: string, salt: string): string;
    static isLeapYear(year: any): boolean;
    static getDays(year: any, month: any, day: any): number;
    static isImage(mimeType: string): boolean;
}
