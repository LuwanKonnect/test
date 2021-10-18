import { Entity, PrimaryColumn } from 'typeorm';

@Entity('stripe_event')
class StripeEventEntity {
  @PrimaryColumn()
  public id: string;
}

export default StripeEventEntity;
