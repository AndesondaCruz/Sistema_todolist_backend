import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { TaskEntity } from './task.entity';
import { PrazoEntity } from './prazo.entity';
import { SubtaskEntity } from './subtask.entity';
import { TagEntity } from 'src/tags/tag.entity';
import { TagsModule } from 'src/tags/tags.module';

@Module({
  imports: [TypeOrmModule.forFeature([TaskEntity, SubtaskEntity, PrazoEntity, TagEntity]), TagsModule],
  providers: [TasksService],
  controllers: [TasksController],
})
export class TasksModule {}
