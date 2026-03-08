import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
} from 'typeorm';
import { TaskEntity } from './task.entity';

@Entity('subtasks')
export class SubtaskEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  descricao: string;

  @Column({ default: false })
  concluida: boolean;

  @ManyToOne(() => TaskEntity, task => task.subtasks, {
    onDelete: 'CASCADE',
  })
  task: TaskEntity;
}
