import type { AbstractDto } from '../dto';
export declare abstract class AbstractEntity<DTO extends AbstractDto = AbstractDto> {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    abstract dtoClass: new (entity: AbstractEntity, options?: GetConstructorArgs<DTO>[1]) => DTO;
    toDto<D = DTO>(options?: GetConstructorArgs<D>[1]): DTO;
}
