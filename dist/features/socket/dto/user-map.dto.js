"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserMapDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const message_dto_1 = require("./message.dto");
class UserMapDto extends swagger_1.PickType(message_dto_1.MessageDto, [
    'u_id',
    'targetId',
]) {
}
exports.UserMapDto = UserMapDto;
//# sourceMappingURL=user-map.dto.js.map