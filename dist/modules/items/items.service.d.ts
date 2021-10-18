import { Items } from './items.entity';
import { Connection } from 'typeorm';
import { SearchConditionsDto } from './dto';
import { CreateItemDto } from './dto/create-item.dto';
export declare class ItemsService {
    private connection;
    private itemsRepository;
    constructor(connection: Connection);
    findOne(i_id: number): Promise<Items>;
    findAll(): Promise<Items[]>;
    findByUid(u_id: string): Promise<Items[]>;
    findByUidNotIid(u_id: string, i_id: number): Promise<Items[]>;
    update(items: Partial<Items>): Promise<{
        code: number;
        msg: string;
    }>;
    search(searchConditionsDto: SearchConditionsDto): Promise<Items[]>;
    remove(i_id: number, u_id: string): Promise<any>;
    save(items: CreateItemDto): Promise<any>;
}
