"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessagePayloadDto = void 0;
const message_dto_1 = require("./message.dto");
const swagger_1 = require("@nestjs/swagger");
class MessagePayloadDto extends swagger_1.OmitType(message_dto_1.MessageDto, [
    'id',
    'createdAt',
    'updatedAt',
]) {
}
exports.MessagePayloadDto = MessagePayloadDto;
//# sourceMappingURL=message-payload.dto.js.map