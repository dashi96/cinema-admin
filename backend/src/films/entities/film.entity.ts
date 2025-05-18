import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity()
export class Film {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string
}
