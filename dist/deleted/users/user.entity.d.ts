export declare class User {
    u_id: number;
    email: string;
    password: string;
    mobile: string;
    avatar: string;
    fullName: string;
    is_deleted: boolean;
    created?: Date;
    updated?: Date;
    address: string;
    city: string;
    country: string;
    state: string;
    monday_am: string;
    monday_pm: string;
    tuesday_am: string;
    tuesday_pm: string;
    wednesday_am: string;
    wednesday_pm: string;
    thursday_am: string;
    thursday_pm: string;
    friday_am: string;
    friday_pm: string;
    saturday_am: string;
    saturday_pm: string;
    sunday_am: string;
    sunday_pm: string;
    bsb: string;
    account_number: string;
    lender_rating: number;
    borrower_rating: number;
}
export declare class Cards {
    c_id: number;
    u_id: number;
    token_id: number;
}
export declare class LoginDTO {
    readonly email: string;
    readonly password: string;
}
export declare class userResponseDTO {
    readonly user: User;
    readonly token: string;
}
