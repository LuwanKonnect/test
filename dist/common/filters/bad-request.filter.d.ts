import type { ArgumentsHost, ExceptionFilter } from '@nestjs/common';
import { UnprocessableEntityException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
export declare class HttpExceptionFilter implements ExceptionFilter {
    reflector: Reflector;
    constructor(reflector: Reflector);
    catch(exception: UnprocessableEntityException, host: ArgumentsHost): void;
    private validationFilter;
}
