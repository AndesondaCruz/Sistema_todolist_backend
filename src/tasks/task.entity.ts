import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToOne,
  OneToMany,
  ManyToMany,
  JoinColumn,
  JoinTable
} from 'typeorm';
import { TaskStatus } from './task.model';
import { PrazoEntity } from './prazo.entity';
import { SubtaskEntity } from './subtask.entity';
import { TagEntity } from '../tags/tag.entity';

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

  @OneToOne(() => PrazoEntity, prazo => prazo.task, {
  cascade: true,
  eager: true,
})
@JoinColumn()
prazo: PrazoEntity;

@OneToMany(() => SubtaskEntity, subtask => subtask.task, {
  cascade: true,
  eager: true,
})
subtasks: SubtaskEntity[];

@ManyToMany(() => TagEntity, tag => tag.tasks, { cascade: false })
@JoinTable({
  name: 'tasks_tags', // tabela pivô
})
tags: TagEntity[];

}
