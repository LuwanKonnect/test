declare enum option {
    delivery = "delivery",
    pickup = "pickup",
    both = "both",
    none = "none"
}
export declare class Booking {
    b_id: number;
    u_id: string;
    i_id: number;
    io_id: string;
    status: number;
    error: boolean;
    deliveryOption: option;
    startDate: number;
    address: string;
    endDate: number;
    year: number;
    price: number;
    created?: Date;
    updated?: Date;
}
export {};
