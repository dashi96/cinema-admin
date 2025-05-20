import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, Index } from 'typeorm'

import { Category } from './category.entity'

@Entity()
export class SubCategory {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  @Index({ unique: true })
  name: string

  @Column('int', { array: true })
  filmIds: number[]

  @ManyToOne(() => Category, (c) => c.subCategories, { onDelete: 'CASCADE' })
  category: Category
}
