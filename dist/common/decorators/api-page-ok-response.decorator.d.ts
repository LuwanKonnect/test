import type { Type } from '@nestjs/common';
export declare function ApiPageOkResponse<T extends Type>(model: T, description?: string): MethodDecorator;
