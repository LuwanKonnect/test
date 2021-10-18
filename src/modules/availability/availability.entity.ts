import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

@Entity()
export class Availability {
  @ApiProperty({
    required: false,
    description: 'ID',
  })
  @IsNumber()
  @PrimaryGeneratedColumn()
  a_id: number;

  @ApiProperty({
    description: 'Item ID',
  })
  @IsNumber()
  @Column()
  i_id: number;

  @IsNotEmpty({ message: 'Must has availability, 1 is available.' })
  @ApiProperty({
    description: 'whole year availability',
  })
  @Column({ length: 800 })
  availability: string;

  @IsNotEmpty({ message: 'Year' })
  @ApiProperty({
    description: 'The year of the availability',
  })
  @Column()
  year: number;

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
