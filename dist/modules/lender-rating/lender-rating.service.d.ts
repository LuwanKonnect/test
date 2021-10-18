import { LenderRating } from './lender-rating.entity';
import { Connection } from 'typeorm';
export declare class LenderRatingService {
    private connection;
    private lenderRatingRepository;
    private userRepository;
    constructor(connection: Connection);
    findOne(r_id: number): Promise<LenderRating>;
    findByBid(l_id: string): Promise<LenderRating[]>;
    findByBookingId(booking_id: number): Promise<LenderRating>;
    update(ratingAsLender: any): Promise<{
        code: number;
        msg: string;
    }>;
    remove(r_id: number, u_id: string): Promise<any>;
    save(ratingAsLender: LenderRating): Promise<any>;
    updateScore(l_id: string): Promise<any>;
}
