"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiPageOkResponse = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const page_dto_1 = require("../constants/dto/page.dto");
function ApiPageOkResponse(model, description) {
    return common_1.applyDecorators(swagger_1.ApiExtraModels(page_dto_1.PageDto), swagger_1.ApiOkResponse({
        description,
        schema: {
            allOf: [
                { $ref: swagger_1.getSchemaPath(page_dto_1.PageDto) },
                {
                    properties: {
                        results: {
                            type: 'array',
                            items: { $ref: swagger_1.getSchemaPath(model) },
                        },
                    },
                },
            ],
        },
    }));
}
exports.ApiPageOkResponse = ApiPageOkResponse;
//# sourceMappingURL=api-page-ok-response.decorator.js.map