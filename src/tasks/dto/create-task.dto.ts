import { IsEnum, IsNotEmpty, IsOptional, IsString, ValidateNested, IsArray, IsBoolean, IsInt } from 'class-validator';
import { Type } from 'class-transformer';
import { TaskStatus } from '../task.model';

class CreatePrazoDto {
  @IsString()
  @IsNotEmpty()
  quando: string;

  @IsString()
  @IsNotEmpty()
  deadline: string;
}

class CreateSubtaskDto {
  @IsString()
  @IsNotEmpty()
  descricao: string;

  @IsOptional()
  @IsBoolean()
  concluida?: boolean;
}

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  titulo: string;

  @IsString()
  @IsNotEmpty()
  descricao: string;

  @IsEnum(TaskStatus)
  @IsOptional()
  status?: TaskStatus;

  @ValidateNested()
  @Type(() => CreatePrazoDto)
  prazo: CreatePrazoDto;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateSubtaskDto)
  subtasks?: CreateSubtaskDto[];
  
  @IsOptional()
  @IsArray()
  @IsInt({ each: true })
  @Type(() => Number)
  tagIds?: number[];
}
