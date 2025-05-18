import { Controller, Get } from '@nestjs/common'

import { Film } from './entities/film.entity'
import { FilmsService } from './films.service'

@Controller('films')
export class FilmsController {
  constructor(private filmsService: FilmsService) {}

  @Get()
  findAll(): Promise<Film[]> {
    return this.filmsService.findAll()
  }
}
