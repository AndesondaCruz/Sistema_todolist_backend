import { IsArray, IsInt } from 'class-validator';

export class UpdateTaskTagsDto {

  @IsArray()
  @IsInt({ each: true })
  tagIds: number[];

}