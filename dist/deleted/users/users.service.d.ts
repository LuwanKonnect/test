import { Connection } from 'typeorm';
import { User } from './user.entity';
import { Salt } from './salt.entity';
export declare class UsersService {
    private connection;
    private usersRepository;
    private saltRepository;
    constructor(connection: Connection);
    findAll(): Promise<User[]>;
    findOne(email: string): Promise<User>;
    findOneByUsername(username: string): Promise<User[]>;
    findAllByUsername(username: string): Promise<User[]>;
    findOneSalt(u_id: number): Promise<Salt>;
    update(user: User, u_id: string): Promise<any>;
    remove(u_id: number): Promise<void>;
    register(user: User): Promise<any>;
}
