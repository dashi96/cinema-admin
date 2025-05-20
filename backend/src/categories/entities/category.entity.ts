import { Entity, PrimaryGeneratedColumn, Column, OneToMany, Index } from 'typeorm'

import { SubCategory } from './sub_category.entity'

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  @Index({ unique: true })
  name: string

  @OneToMany(() => SubCategory, (sc) => sc.category, { cascade: true, eager: true })
  subCategories: SubCategory[]
}
