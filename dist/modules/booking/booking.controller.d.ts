import { BookingService } from './booking.service';
import { Booking } from './booking.entity';
import { AvailabilityService } from '../availability/availability.service';
import { EntityManager } from 'typeorm';
export declare class BookingController {
    private readonly bookingService;
    private readonly availabilityService;
    constructor(bookingService: BookingService, availabilityService: AvailabilityService);
    save(booking: Booking, timestamp: number, id: string): Promise<any>;
    findByUid(u_id: string): Promise<Booking[]>;
    findByOwnerId(io_id: string): Promise<Booking[]>;
    findUnsanctionedByOwnerId(io_id: string): Promise<Booking[]>;
    findSanctionedByOwnerId(io_id: string): Promise<Booking[]>;
    findUnsanctionedByOwnerIdFrom(io_id: string, date: number): Promise<Booking[]>;
    findSanctionedByOwnerIdFrom(io_id: string, date: number): Promise<Booking[]>;
    findByEid(b_id: string): Promise<Booking>;
    update(io_id: string, booking: Partial<Booking>): Promise<{
        code: number;
        msg: string;
    }>;
    reject(b_id: string, u_id: string): Promise<{
        code: number;
        msg: string;
    }>;
    approve(b_id: string, u_id: string, manager: EntityManager): Promise<{
        code: number;
        msg: string;
    }>;
    delete(u_id: string, b_id: string): Promise<{
        code: number;
        msg: string;
    }>;
    search(keyword: string): Promise<Booking[]>;
}
