import { BaseEntity, Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'
import { Day as GraphqlDay } from '../graphql/schema.types'
import { Arrival, Departure, Location, Stop, Trip } from './Location'

@Entity()
export class Day extends BaseEntity implements GraphqlDay {

  @PrimaryGeneratedColumn()
  id: number

  @CreateDateColumn({select: false})
  timeCreated: Date

  @UpdateDateColumn({select: false})
  timeUpdated: Date

  @Column({
    length: 100,
  })
  date: string

  @OneToMany(() => Location, location => location.day, {cascade: true})
  locations: (Departure | Stop | Arrival)[]

  @OneToMany(() => Trip, trip => trip.day, {cascade: true})
  trips: Trip[]
}