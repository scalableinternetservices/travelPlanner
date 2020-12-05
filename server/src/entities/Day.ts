import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'
import { Day as GraphqlDay } from '../graphql/schema.types'
import { Location, Trip } from './Location'

@Entity()
export class Day extends BaseEntity implements GraphqlDay {

  @PrimaryGeneratedColumn()
  id: number

  @CreateDateColumn()
  timeCreated: Date

  @UpdateDateColumn()
  timeUpdated: Date

  @Column({
    length: 100,
  })
  date: string

  @OneToOne(() => Location)
  @JoinColumn()
  locations: Location[]

  @OneToOne(() => Trip)
  @JoinColumn()
  trips: Trip[]
}