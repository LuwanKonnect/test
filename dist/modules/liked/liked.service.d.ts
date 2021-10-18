import { Liked } from './liked.entity';
export declare class LikedService {
    private likedRepository;
    findOne(l_id: string): Promise<Liked>;
    findAll(): Promise<Liked[]>;
    findByUid(u_id: string): Promise<Liked[]>;
    findByUidAndIid(u_id: string, i_id: string): Promise<Liked[]>;
    update(liked: Liked): Promise<{
        code: number;
        msg: string;
    }>;
    removeByIid(i_id: string, u_id: string): Promise<any>;
    save(liked: Liked): Promise<any>;
}
