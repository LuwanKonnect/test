import { BorrowerRatingService } from './borrower-rating.service';
import { BorrowerRating } from './borrower-rating.entity';
export declare class BorrowerRatingController {
    private readonly borrowerRatingService;
    constructor(borrowerRatingService: BorrowerRatingService);
    save(borrowerRating: BorrowerRating, id: string): Promise<any>;
    findByUid(u_id: string): Promise<BorrowerRating[]>;
    findByBookingId(b_id: string): Promise<BorrowerRating>;
    update(borrowerRating: BorrowerRating): Promise<{
        code: number;
        msg: string;
    }>;
    delete(u_id: string, r_id: string): Promise<{
        code: number;
        msg: string;
    }>;
}
