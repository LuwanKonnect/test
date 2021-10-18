import type { EntitySubscriberInterface, InsertEvent, UpdateEvent } from 'typeorm';
import { UserEntity } from '../../core/user/user.entity';
export declare class UserSubscriber implements EntitySubscriberInterface<UserEntity> {
    listenTo(): typeof UserEntity;
    beforeInsert(event: InsertEvent<UserEntity>): void;
    beforeUpdate(event: UpdateEvent<UserEntity>): void;
}
