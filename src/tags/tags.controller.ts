import { Controller, Post, Body, Get } from '@nestjs/common';
import { TagsService } from './tags.service';

@Controller('tags')
export class TagsController {
  constructor(private readonly tagsService: TagsService) {}

  @Post()
  create(@Body() body: { nome: string }) {
    return this.tagsService.create(body.nome);
  }

  @Get()
  findAll() {
    return this.tagsService.findAll();
}
}
