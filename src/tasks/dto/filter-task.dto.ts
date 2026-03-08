import { IsOptional, IsEnum, IsString, IsInt, Min, IsIn, Max } 
from 'class-validator';
import { Type } from 'class-transformer';
import { TaskStatus } from '../task.model';

export class FilterTaskDto {

  @IsOptional()
  @IsEnum(TaskStatus)
  status?: TaskStatus;

  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number = 1;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(50)
  limit?: number = 10;

  @IsOptional()
  @IsString()
  sort?: string = 'createdAt';

  @IsOptional()
  @IsIn(['ASC', 'DESC'])
  order?: 'ASC' | 'DESC' = 'ASC';

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  tagId?: number;
}
