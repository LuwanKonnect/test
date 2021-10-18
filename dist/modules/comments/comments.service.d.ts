import { Comments } from './comments.entity';
import { ItemsService } from '../items/items.service';
export declare class CommentsService {
    private readonly itemsService;
    private commentsRepository;
    private userRepository;
    constructor(itemsService: ItemsService);
    findOne(c_id: string): Promise<Comments>;
    findAll(t_id: string, type: string): Promise<any>;
    findByUid(u_id: string): Promise<Comments[]>;
    update(comments: Comments): Promise<{
        code: number;
        msg: string;
    }>;
    remove(c_id: string, u_id: string): Promise<any>;
    save(comments: Comments): Promise<{
        code: number;
        msg: string;
    }>;
}
