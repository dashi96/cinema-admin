import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { Film } from './entities/film.entity'
import { FilmsService } from './films.service'
import { FilmsController } from './films.controller'

@Module({
  imports: [TypeOrmModule.forFeature([Film])],
  providers: [FilmsService],
  controllers: [FilmsController],
  exports: [FilmsService]
})
export class FilmsModule {}
