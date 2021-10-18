import type { PipeTransform } from '@nestjs/common';
import type { Type } from '@nestjs/common/interfaces';
import { AdminRoleEnum } from '../constants';
export declare function Auth(...roles: AdminRoleEnum[]): <TFunction extends Function, Y>(target: object | TFunction, propertyKey?: string | symbol, descriptor?: TypedPropertyDescriptor<Y>) => void;
export declare function UUIDParam(property: string, ...pipes: Array<Type<PipeTransform> | PipeTransform>): ParameterDecorator;
