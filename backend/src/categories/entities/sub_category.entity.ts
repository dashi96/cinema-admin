import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm'

import { Category } from './category.entity'

@Entity()
export class SubCategory {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column('int', { array: true })
  filmIds: number[]

  @ManyToOne(() => Category, (c) => c.subCategories, { onDelete: 'CASCADE' })
  category: Category
}
