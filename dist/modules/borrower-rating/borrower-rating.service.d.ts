import { BorrowerRating } from './borrower-rating.entity';
import { Connection } from 'typeorm';
export declare class BorrowerRatingService {
    private connection;
    private borrowerRatingRepository;
    private userRepository;
    constructor(connection: Connection);
    findOne(r_id: number): Promise<BorrowerRating>;
    findByBid(b_id: string): Promise<BorrowerRating[]>;
    findByBookingId(booking_id: number): Promise<BorrowerRating>;
    update(ratingAsBorrower: any): Promise<{
        code: number;
        msg: string;
    }>;
    remove(r_id: number, u_id: string): Promise<{
        code: number;
        msg: string;
    }>;
    save(ratingAsBorrower: BorrowerRating): Promise<any>;
    updateScore(b_id: string): Promise<any>;
}
