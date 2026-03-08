import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TagEntity } from './tag.entity';

@Injectable()
export class TagsService {
  constructor(
    @InjectRepository(TagEntity)
    private readonly tagRepository: Repository<TagEntity>,
  ) {}

  async create(nome: string) {
    const tag = this.tagRepository.create({ nome });
    return this.tagRepository.save(tag);
  }

  async findAll() {
  return this.tagRepository.find({
    relations: ['tasks', 'tasks.prazo'],
  });
}
}
