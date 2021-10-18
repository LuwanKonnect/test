"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateItemDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const item_dto_1 = require("./item.dto");
class CreateItemDto extends swagger_1.OmitType(item_dto_1.ItemDto, [
    'i_id',
    'created',
    'updated',
]) {
}
exports.CreateItemDto = CreateItemDto;
//# sourceMappingURL=create-item.dto.js.map