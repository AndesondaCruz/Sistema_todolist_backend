import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
} from 'typeorm';
import { TaskEntity } from '../tasks/task.entity';

@Entity('tags')
export class TagEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  nome: string;

  @ManyToMany(() => TaskEntity, task => task.tags)
  tasks: TaskEntity[];
}
