import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm'

import { SubCategory } from './sub_category.entity'

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @OneToMany(() => SubCategory, (sc) => sc.category, { cascade: true, eager: true })
  subCategories: SubCategory[]
}
