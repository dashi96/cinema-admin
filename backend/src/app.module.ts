import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { dataSourceOptions } from './db/data_source'
import { FilmsModule } from './films/films.module'
import { CategoriesModule } from './categories/categories.module'

@Module({
  imports: [TypeOrmModule.forRoot(dataSourceOptions), FilmsModule, CategoriesModule],
  controllers: [],
  providers: []
})
export class AppModule {}
