import { CreateTaskDto } from './dto/create-task.dto';
import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Patch,
  Body,
  Param,
  Query,
  DefaultValuePipe,
  ParseEnumPipe,
  ParseIntPipe,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TaskEntity } from './task.entity';
import { TaskStatus } from './task.model';
import { UpdateTaskDto } from './dto/update-task.dto';
import { FilterTaskDto } from './dto/filter-task.dto';
import { UpdateTaskTagsDto } from './dto/update-task-tags.dto';



@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

@Post()
async create(
  @Body() createTaskDto: CreateTaskDto,
): Promise<TaskEntity> {
  return this.tasksService.create(createTaskDto);
}

@Post(':id/tags')
addTags(
  @Param('id') id: number,
  @Body('tagIds') tagIds: number[],
) {
  return this.tasksService.addTagsToTask(+id, tagIds);
}

 @Get()
findAll(@Query() filterDto: FilterTaskDto) {
  return this.tasksService.findAll(filterDto);
}

  @Get(':id')
  async findById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<TaskEntity> {
    return this.tasksService.findById(id);
  }

  @Patch(':id')
updatePartial(
  @Param('id', ParseIntPipe) id: number,
  @Body() updateTaskDto: UpdateTaskDto,
) {
  return this.tasksService.updatePartial(id, updateTaskDto);
}

  @Patch(':taskId/tags')
updateTags(
  @Param('taskId', ParseIntPipe) taskId: number,
  @Body() dto: UpdateTaskTagsDto,
) {
  return this.tasksService.updateTaskTags(taskId, dto.tagIds);
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
  
  @Delete(':taskId/tags/:tagId')
removeTag(
  @Param('taskId', ParseIntPipe) taskId: number,
  @Param('tagId', ParseIntPipe) tagId: number,
) {
  return this.tasksService.removeTagFromTask(taskId, tagId);
}
}
