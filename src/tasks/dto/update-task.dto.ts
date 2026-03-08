import {
  IsEnum,
  IsOptional,
  IsString,
  ValidateNested,
  IsArray,
  IsBoolean,
} from 'class-validator';
import { Type } from 'class-transformer';
import { TaskStatus } from '../task.model';

class UpdatePrazoDto {
  @IsOptional()
  @IsString()
  quando?: string;

  @IsOptional()
  @IsString()
  deadline?: string;
}

class UpdateSubtaskDto {
  @IsOptional()
  @IsString()
  descricao?: string;

  @IsOptional()
  @IsBoolean()
  concluida?: boolean;
}

export class UpdateTaskDto {
  @IsOptional()
  @IsString()
  titulo?: string;

  @IsOptional()
  @IsString()
  descricao?: string;

  @IsOptional()
  @IsEnum(TaskStatus)
  status?: TaskStatus;

  @IsOptional()
  @ValidateNested()
  @Type(() => UpdatePrazoDto)
  prazo?: UpdatePrazoDto;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UpdateSubtaskDto)
  subtasks?: UpdateSubtaskDto[];
}
