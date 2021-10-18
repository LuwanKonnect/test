import { Repository } from 'typeorm';
import { Availability } from './availability.entity';
import { Connection } from 'typeorm';
export declare class AvailabilityService {
    private availabilityRepository;
    private readonly connection;
    constructor(availabilityRepository: Repository<Availability>, connection: Connection);
    save(i_id: number, availability: string, year: number): Promise<Availability>;
    checkAvailabilityByRegex(availability: string, start: number, end: number): boolean;
    checkAvailability(i_id: number, year: number, start: number, end: number): Promise<boolean>;
    replaceAvailability(availability: string, start: number, end: number): string;
    update(i_id: number, start: number, end: number, year: number): Promise<Availability>;
    findOneByIdAndYear(i_id: number, year: number): Promise<Availability>;
}
