"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UtilsProvider = void 0;
const crypto = require("crypto");
class UtilsProvider {
    static toDto(model, entity, options) {
        if (Array.isArray(entity)) {
            return entity.map((u) => new model(u, options));
        }
        return new model(entity, options);
    }
    static generateRandomString(length) {
        return crypto.randomBytes(length).toString('base64');
    }
    static encryptPassword(password, salt) {
        if (!password || !salt) {
            return '';
        }
        const tempSalt = Buffer.from(salt, 'base64');
        return (crypto.pbkdf2Sync(password, tempSalt, 100, 16, 'sha1').toString('base64'));
    }
    static isLeapYear(year) {
        return (year % 4 === 0 && year % 100 !== 0) || year % 400 == 0;
    }
    static getDays(year, month, day) {
        let days = day;
        const monthDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        for (let i = 0; i < month - 1; i++) {
            days += monthDays[i];
        }
        if (UtilsProvider.isLeapYear(year) && month > 2) {
            days++;
        }
        return days++;
    }
    static isImage(mimeType) {
        const imageMimeTypes = ['image/jpeg', 'image/png'];
        return imageMimeTypes.includes(mimeType);
    }
}
exports.UtilsProvider = UtilsProvider;
//# sourceMappingURL=utils.provider.js.map