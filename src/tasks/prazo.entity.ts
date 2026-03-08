import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from 'typeorm';
import { TaskEntity } from './task.entity';

@Entity('prazo')
export class PrazoEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'date' })
  quando: Date;

  @Column({ type: 'date' })
  deadline: Date;

  @OneToOne(() => TaskEntity, task => task.prazo)
  task: TaskEntity;
}
