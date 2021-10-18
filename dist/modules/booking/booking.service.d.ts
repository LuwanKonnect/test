import { Booking } from './booking.entity';
import { Connection } from 'typeorm';
import { SchedulerRegistry } from '@nestjs/schedule';
export declare class BookingService {
    private connection;
    private schedulerRegistry;
    private bookingRepository;
    constructor(connection: Connection, schedulerRegistry: SchedulerRegistry);
    findOne(b_id: number): Promise<Booking>;
    findAll(): Promise<Booking[]>;
    findByUid(u_id: string): Promise<Booking[]>;
    findByIOid(io_id: string): Promise<Booking[]>;
    findByIid(i_id: number): Promise<Booking[]>;
    findByRes(booking: Booking): Promise<Booking[]>;
    findByUidUnsanctioned(u_id: string): Promise<Booking[]>;
    findByUidSanctioned(u_id: string): Promise<Booking[]>;
    findByUidFrom(u_id: string, date: number): Promise<Booking[]>;
    findByUidUnsanctionedFrom(u_id: string, date: number): Promise<Booking[]>;
    findByUidSanctionedFrom(u_id: string, date: number): Promise<Booking[]>;
    update(booking: Partial<Booking>): Promise<{
        code: number;
        msg: string;
    }>;
    remove(b_id: number, u_id: string): Promise<any>;
    save(booking: Booking, timestamp: number): Promise<any>;
    addTimeout(id: number, milliseconds: number): void;
    search(keyword: string): Promise<Booking[]>;
}
