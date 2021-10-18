import * as _ from 'lodash';
import type { IApiFile } from '../interfaces';
export declare function ApiFile(files: _.Many<IApiFile>, options?: Partial<{
    isRequired: boolean;
}>): MethodDecorator;
