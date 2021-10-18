import type { AbstractEntity } from '../entity/abstract.entity';
export declare class AbstractDto {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    constructor(entity: AbstractEntity);
}
