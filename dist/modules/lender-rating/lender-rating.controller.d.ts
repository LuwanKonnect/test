import { LenderRatingService } from './lender-rating.service';
import { LenderRating } from './lender-rating.entity';
export declare class LenderRatingController {
    private readonly lenderRatingService;
    constructor(lenderRatingService: LenderRatingService);
    save(lenderRating: LenderRating, id: string): Promise<any>;
    findByUid(u_id: string): Promise<LenderRating[]>;
    findByBookingId(b_id: string): Promise<LenderRating>;
    update(lenderRating: LenderRating): Promise<{
        code: number;
        msg: string;
    }>;
    delete(u_id: string, r_id: string): Promise<any>;
}
