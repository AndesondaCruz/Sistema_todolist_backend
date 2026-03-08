import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { TaskEntity } from './task.entity';
import { TaskStatus } from './task.model';
import { FilterTaskDto } from './dto/filter-task.dto';
import { TagEntity } from 'src/tags/tag.entity';
import { number } from 'joi';


@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskEntity)
    private readonly taskRepository: Repository<TaskEntity>,

    @InjectRepository(TagEntity)
    private readonly tagsRepository: Repository<TagEntity>
  ) {}

  async create(createTaskDto: CreateTaskDto): Promise<TaskEntity> {
  const { tagIds, ...taskData } = createTaskDto;

  const task = this.taskRepository.create(taskData);

  if (tagIds && tagIds.length > 0) {
    const tags = await this.tagsRepository.findBy({
      id: In(tagIds),
    });

    task.tags = tags;
  }

  return this.taskRepository.save(task);
}

 async findAll(filterDto: FilterTaskDto) {

  const {
  status,
  search,
  page = 1,
  limit = 10,
  sort = 'createdAt',
  order = 'ASC',
  tagId,
} = filterDto;

  const query = this.taskRepository
    .createQueryBuilder('task')
    .leftJoinAndSelect('task.subtasks', 'subtasks')
    .leftJoinAndSelect('task.prazo', 'prazo')
    .leftJoinAndSelect('task.tags', 'tags');

  // filtro por status
  if (status) {
    query.andWhere('task.status = :status', { status });
  }

  // busca textual
  if (search) {
    query.andWhere(
      '(LOWER(task.titulo) LIKE LOWER(:search) OR LOWER(task.descricao) LIKE LOWER(:search))',
      { search: `%${search}%` },
    );
  }

  if (tagId) {
  query.andWhere('tags.id = :tagId', { tagId });
  }

  // ordenação
  const allowedSortFields = ['id', 'titulo', 'createdAt', 'status'];

  const sortField = allowedSortFields.includes(sort)
    ? sort
    : 'createdAt';

  const sortOrder = order === 'DESC' ? 'DESC' : 'ASC';

  query.orderBy(`task.${sortField}`, sortOrder);

  query.distinct(true);

  // aqui começa a paginação
  const offset = (page - 1) * limit;
  query.skip(offset).take(limit);

  const [data, total] = await query.getManyAndCount();

return {
  data,
  total,
  page,
  lastPage: Math.ceil(total / limit),
};
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

  async updatePartial(
  id: number,
  updateTaskDto: UpdateTaskDto,
): Promise<TaskEntity> {
  const task = await this.findById(id);

  if (updateTaskDto.titulo !== undefined)
    task.titulo = updateTaskDto.titulo;

  if (updateTaskDto.descricao !== undefined)
    task.descricao = updateTaskDto.descricao;

  if (updateTaskDto.status !== undefined)
    task.status = updateTaskDto.status;

  if (updateTaskDto.prazo) {
  if (!task.prazo) {
    task.prazo = updateTaskDto.prazo as any;
  } else {
    Object.assign(task.prazo, updateTaskDto.prazo);
  }
}

  if (updateTaskDto.subtasks) {
    task.subtasks = updateTaskDto.subtasks as any;
  }

  return this.taskRepository.save(task);
}

async findById(id: number) {
  const task = await this.taskRepository.findOne({
    where: { id },
    relations: ['tags'],
  });

  if (!task) {
    throw new NotFoundException(`Task com ID ${id} não encontrada`);
  }

  return task;
}

async addTagsToTask(taskId: number, tagIds: number[]) {
  const task = await this.findById(taskId);

  const tags = await this.tagsRepository.findBy({
    id: In(tagIds),
  });

  task.tags = tags;

  return this.taskRepository.save(task);
}

async removeTagFromTask(taskId: number, tagId: number) {
  const task = await this.findById(taskId);

  task.tags = task.tags.filter(tag => tag.id !== tagId);

  return this.taskRepository.save(task);
}

async updateTaskTags(taskId: number, tagIds: number[]) {

  const task = await this.taskRepository.findOne({
    where: { id: taskId },
    relations: ['tags'],
  });

  if (!task) {
    throw new NotFoundException('Task não encontrada');
  }

  const tags = await this.tagsRepository.findBy({
  id: In(tagIds),
});

if (tags.length !== tagIds.length) {
  throw new NotFoundException('Uma ou mais tags não existem');
}

task.tags = tags;

return this.taskRepository.save(task);
}

}
