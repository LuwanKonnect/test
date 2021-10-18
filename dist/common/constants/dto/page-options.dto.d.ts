import { OrderEnum } from '../enum';
export declare class PageOptionsDto {
    readonly order: OrderEnum;
    readonly page: number;
    readonly take: number;
    get skip(): number;
    readonly q?: string;
}
