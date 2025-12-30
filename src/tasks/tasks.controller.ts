import { CreateTaskDto } from './dto/create-task.dto';
import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TaskEntity } from './task.entity';
import { TaskStatus } from './task.model';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

@Post()
async create(
  @Body() createTaskDto: CreateTaskDto,
): Promise<TaskEntity> {
  return this.tasksService.create(createTaskDto);
}

 @Get()
  async findAll(): Promise<TaskEntity[]> {
    return this.tasksService.findAll();
  }

  @Get(':id')
  async findById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<TaskEntity> {
    return this.tasksService.findById(id);
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body('titulo') titulo?: string,
    @Body('descricao') descricao?: string,
    @Body('status') status?: TaskStatus,
  ): Promise<TaskEntity> {
    return this.tasksService.update(id, titulo, descricao, status);
  }

  @Delete(':id')
  async delete(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<void> {
    await this.tasksService.delete(id);
  }
}
