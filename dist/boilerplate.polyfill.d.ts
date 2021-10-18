import 'source-map-support/register';
import type { AbstractEntity } from './common/constants';
import type { AbstractDto } from './common/constants';
import { PageDto } from './common/constants';
import { PageMetaDto } from './common/constants';
import type { PageOptionsDto } from './common/constants';
declare global {
    export type GetConstructorArgs<T> = T extends new (...args: infer U) => any ? U : never;
    interface Array<T> {
        toDtos<Entity extends AbstractEntity<Dto>, Dto extends AbstractDto>(this: T[], options?: any): Dto[];
        toPageDto<T extends AbstractEntity<Dto>, Dto extends AbstractDto>(this: T[], pageMetaDto: PageMetaDto): PageDto<Dto>;
    }
}
declare module 'typeorm' {
    interface QueryBuilder<Entity> {
        searchByString(q: string, columnNames: string[]): this;
    }
    interface SelectQueryBuilder<Entity> {
        paginate(this: SelectQueryBuilder<Entity>, pageOptionsDto: PageOptionsDto): Promise<{
            items: Entity[];
            pageMetaDto: PageMetaDto;
        }>;
    }
}
