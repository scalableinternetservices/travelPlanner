import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'
import { ItineraryType } from '../graphql/schema.types'

@Entity()
export class Itinerary extends BaseEntity implements  {

  @PrimaryGeneratedColumn()
  id: number

  @CreateDateColumn()
  timeCreated: Date

  @UpdateDateColumn()
  timeUpdated: Date

  @Column({
    length: 100,
  })
  itinerary: Day[]
}

@Entity()
export class Day extends BaseEntity implements  {

  @PrimaryGeneratedColumn()
  id: number

  @CreateDateColumn()
  timeCreated: Date

  @UpdateDateColumn()
  timeUpdated: Date

  @Column()
  day: number

  @Column({
    length: 100,
  })
  date: string

  @Column()
  schedule: Location[]
}

export abstract class Location extends BaseEntity implements  {

  @PrimaryGeneratedColumn()
  id: number

  @Column({
    type: 'enum',
    enum: ItineraryType
  })
  type: ItineraryType

  @Column({
    length: 100,
  })
  name: string

  @Column({
    length: 100,
  })
  address: string

  @Column({
    length: 100,
  })
  coordinates: string
}

@Entity()
export class Stop extends Location implements  {

  @Column({
    length: 100,
  })
  arrival: string

  @Column({
    length: 100,
  })
  departure: string

  @Column()
  duration: number
}

@Entity()
export class Departure extends Location implements  {

  @Column({
    length: 100,
  })
  departure: string
}

@Entity()
export class Arrival extends Location implements  {

  @Column({
    length: 100,
  })
  arrival: string
}

@Entity()
export class Trip extends Location implements  {

  @PrimaryGeneratedColumn()
  id: number

  @Column({
    type: 'enum',
    enum: ItineraryType
  })
  type: ItineraryType

  @Column({
    length: 100,
  })
  transportation: string

  @Column({
    length: 100,
  })
  duration: number

  @Column({
    length: 100,
  })
  cost: number
}