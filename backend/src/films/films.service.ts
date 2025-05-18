import { Repository } from 'typeorm'
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'

import { Film } from './entities/film.entity'

@Injectable()
export class FilmsService {
  constructor(@InjectRepository(Film) private repo: Repository<Film>) {}

  findAll(): Promise<Film[]> {
    return this.repo.find()
  }
}
