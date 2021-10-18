import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryColumn } from 'typeorm';
import { IsString } from 'class-validator';
@Entity('socket')
export class SocketEntity {
  @ApiProperty({
    required: true,
    description: 'User ID',
  })
  @PrimaryColumn({ unique: true })
  u_id: string;

  @ApiProperty({
    required: true,
    description: 'socket ID',
  })
  @IsString()
  @Column({ default: null })
  socketId: string;
}
