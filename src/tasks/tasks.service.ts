import { CreateTaskDto } from './dto/create-task.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TaskEntity } from './task.entity';
import { TaskStatus } from './task.model';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskEntity)
    private readonly taskRepository: Repository<TaskEntity>,
  ) {}

  async create(createTaskDto: CreateTaskDto): Promise<TaskEntity> {
  const task = this.taskRepository.create(createTaskDto);
  

    return this.taskRepository.save(task);
  }

  async findAll(): Promise<TaskEntity[]> {
    return this.taskRepository.find();
  }

  async findById(id: number): Promise<TaskEntity> {
    const task = await this.taskRepository.findOne({
      where: { id },
    });

    if (!task) {
      throw new NotFoundException('Tarefa não encontrada');
    }

    return task;
  }

  async update(
    id: number,
    titulo?: string,
    descricao?: string,
    status?: TaskStatus,
  ): Promise<TaskEntity> {
    const task = await this.findById(id);

    if (titulo !== undefined) task.titulo = titulo;
    if (descricao !== undefined) task.descricao = descricao;
    if (status !== undefined) task.status = status;

    return this.taskRepository.save(task);
  }

  async delete(id: number): Promise<void> {
    const result = await this.taskRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException('Tarefa não encontrada');
    }
  }
}
