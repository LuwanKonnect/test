import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, Max, Min } from 'class-validator';

@Entity()
export class Chat {
  @ApiProperty({
    required: false,
    description: 'Chat ID',
  })
  @IsNumber()
  @PrimaryGeneratedColumn()
  c_id: number;

  @ApiProperty({
    required: true,
    description: 'User ID',
  })
  @IsString()
  @Column()
  u_id: string;

  @ApiProperty({
    required: true,
    description: 'receiver id',
  })
  @IsString()
  @Column()
  receiver_id: string;

  @IsNotEmpty({ message: 'Comment content' })
  @ApiProperty({
    required: true,
    description: 'Comment content',
  })
  @Column()
  content: string;

  @ApiProperty({
    required: false,
    description: 'chat status, 0 is unread, 1 is read. For future use',
  })
  @Max(3)
  @Min(0)
  @Column({ default: 0 })
  status: number;

  @Column({ default: false })
  is_deleted: boolean;

  @ApiProperty({
    required: false,
  })
  @CreateDateColumn()
  created?: Date;

  @ApiProperty({
    required: false,
  })
  @UpdateDateColumn()
  updated?: Date;
}
