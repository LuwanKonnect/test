import { AvailabilityService } from './availability.service';
import { Availability } from './availability.entity';
export declare class AvailabilityController {
    private readonly availabilityService;
    constructor(availabilityService: AvailabilityService);
    findOneByIdAndYear(i_id: number, year: number): Promise<Availability>;
    temperaUpdate(i_id: number, year: number, start: number, end: number): Promise<Availability>;
}
