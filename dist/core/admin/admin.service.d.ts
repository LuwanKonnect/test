import { AdminEntity } from './admin.entity';
import { Repository } from 'typeorm';
export declare class AdminService {
    private adminRepository;
    constructor(adminRepository: Repository<AdminEntity>);
    findOneByEmail(email: string): Promise<AdminEntity>;
}
