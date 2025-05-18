import { DataSource, DataSourceOptions } from 'typeorm'

import * as dotenv from 'dotenv'
dotenv.config()

console.log(process.env.DATABASE_NAME)

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DATABASE_HOST,
  port: parseInt(process.env.DATABASE_PORT),
  username: process.env.DATABASE_USERNAME,
  database: process.env.DATABASE_NAME,
  password: process.env.DATABASE_PASSWORD,
  entities: ['dist/**/*.entity.js'],
  migrations: ['dist/db/migrations/*.js'],

  synchronize: false,
  logging: true,

  ssl:
    process.env.DATABASE_SSL === '1'
      ? {
          rejectUnauthorized: false
        }
      : false
}

const dataSource = new DataSource(dataSourceOptions)
export default dataSource
