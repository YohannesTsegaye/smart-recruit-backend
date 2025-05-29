import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { IsString } from 'class-validator';

@Entity()
export class JobPost {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  title!: string;

  @Column('text')
  description!: string;

  @Column()
  company!: string;

  @Column()
  location!: string;

  @Column()
  jobType!: string;

  @Column({ nullable: true, default: 'General' })
  @IsString()
  department?: string;

  @Column()
  experience!: string;

  @Column('decimal', { precision: 10, scale: 2 })
  salary!: number;

  @Column()
  deadline!: Date;

  @Column({ default: true })
  isActive!: boolean;

  @Column('simple-array', { nullable: true })
  requirements!: string[];

  @Column('simple-array', { nullable: true })
  responsibilities!: string[];

  @Column('simple-array', { nullable: true })
  skills!: string[];

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
