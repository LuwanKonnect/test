import { CommentsService } from './comments.service';
import { Comments } from './comments.entity';
export declare class CommentsController {
    private readonly commentsService;
    constructor(commentsService: CommentsService);
    save(comments: Comments, id: string): Promise<{
        code: number;
        msg: string;
    }>;
    findByUid(u_id: string): Promise<Comments[]>;
    update(comments: Comments): Promise<{
        code: number;
        msg: string;
    }>;
    delete(u_id: string, c_id: string): Promise<any>;
}
