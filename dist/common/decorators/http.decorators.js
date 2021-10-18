"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UUIDParam = exports.Auth = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const guards_1 = require("../guards");
const guards_2 = require("../guards");
function Auth(...roles) {
    return common_1.applyDecorators(common_1.SetMetadata('roles', roles), common_1.UseGuards(guards_1.JwtAuthGuard, guards_2.RolesGuard), swagger_1.ApiBearerAuth(), swagger_1.ApiUnauthorizedResponse({ description: 'Unauthorized' }));
}
exports.Auth = Auth;
function UUIDParam(property, ...pipes) {
    return common_1.Param(property, new common_1.ParseUUIDPipe({ version: '4' }), ...pipes);
}
exports.UUIDParam = UUIDParam;
//# sourceMappingURL=http.decorators.js.map