import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';
import { TaskStatus } from './task.model';

@Entity('tasks')
export class TaskEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  titulo: string;

  @Column()
  descricao: string;

  @Column({
    type: 'enum',
    enum: ['A_FAZER', 'FAZENDO', 'FEITO'],
    default: 'A_FAZER',
  })
  status: TaskStatus;

  @CreateDateColumn()
  createdAt: Date;
}
