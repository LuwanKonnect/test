"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AvailabilityController = void 0;
const common_1 = require("@nestjs/common");
const availability_service_1 = require("./availability.service");
const swagger_1 = require("@nestjs/swagger");
const items_entity_1 = require("../items/items.entity");
let AvailabilityController = class AvailabilityController {
    constructor(availabilityService) {
        this.availabilityService = availabilityService;
    }
    findOneByIdAndYear(i_id, year) {
        return this.availabilityService.findOneByIdAndYear(i_id, year);
    }
    async temperaUpdate(i_id, year, start, end) {
        return this.availabilityService.update(i_id, start, end, year);
    }
};
__decorate([
    common_1.Get('findOneByIdAndYear'),
    swagger_1.ApiBearerAuth(),
    swagger_1.ApiResponse({ status: 200, type: [items_entity_1.Items], description: 'success' }),
    __param(0, common_1.Query('i_id', new common_1.ParseIntPipe({ errorHttpStatusCode: common_1.HttpStatus.NOT_ACCEPTABLE }))),
    __param(1, common_1.Query('year', new common_1.ParseIntPipe({ errorHttpStatusCode: common_1.HttpStatus.NOT_ACCEPTABLE }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], AvailabilityController.prototype, "findOneByIdAndYear", null);
__decorate([
    common_1.Patch('temperaUpdate'),
    __param(0, common_1.Body('i_id', common_1.ParseIntPipe)),
    __param(1, common_1.Body('year', common_1.ParseIntPipe)),
    __param(2, common_1.Body('start', common_1.ParseIntPipe)),
    __param(3, common_1.Body('end', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, Number, Number]),
    __metadata("design:returntype", Promise)
], AvailabilityController.prototype, "temperaUpdate", null);
AvailabilityController = __decorate([
    swagger_1.ApiTags('Availability'),
    common_1.Controller('availability'),
    __metadata("design:paramtypes", [availability_service_1.AvailabilityService])
], AvailabilityController);
exports.AvailabilityController = AvailabilityController;
//# sourceMappingURL=availability.controller.js.map