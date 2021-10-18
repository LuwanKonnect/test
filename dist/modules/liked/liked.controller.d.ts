import { LikedService } from './liked.service';
import { Liked } from './liked.entity';
export declare class LikedController {
    private readonly likedService;
    constructor(likedService: LikedService);
    save(liked: Liked, id: string): Promise<any>;
    findByUid(u_id: string): Promise<Liked[]>;
    findByLid(l_id: string): Promise<Liked>;
    delete(u_id: string, i_id: string): Promise<any>;
}
