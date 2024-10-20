import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import 'reflect-metadata';

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id!: number;  // Using '!' to indicate that this will be assigned by TypeORM

  @Column()
  title!: string;

  @Column({ nullable: true })
  description?: string;

  @Column({ default: false })
  completed!: boolean;

  @Column({ type: 'datetime', nullable: true })
  deadline?: Date;
}

