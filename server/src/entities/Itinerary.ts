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
  day1: number

  @Column({
    length: 100,
    nullable: true,
  })
  day2: number

  @Column({
    length: 100,
    nullable: true,
  })
  day3: number

  @Column({
    length: 100,
    nullable: true,
  })
  day4: number

  @Column({
    length: 100,
    nullable: true,
  })
  day5: number
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

  @Column({
    length: 100,
  })
  location1: number

  @Column({
    length: 100,
    nullable: true
  })
  trip1: number

  @Column({
    length: 100,
    nullable: true,
  })
  location2: number

  @Column({
    length: 100,
    nullable: true
  })
  trip2: number

  @Column({
    length: 100,
    nullable: true,
  })
  location3: number

  @Column({
    length: 100,
    nullable: true
  })
  trip3: number

  @Column({
    length: 100,
    nullable: true,
  })
  location4: number

  @Column({
    length: 100,
    nullable: true
  })
  trip4: number

  @Column({
    length: 100,
    nullable: true,
  })
  location5: number
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

  @Column({
    length: 100,
    nullable: true,
  })
  arrival: string

  @Column({
    length: 100,
    nullable: true,
  })
  departure: string

  @Column({
    nullable: true,
  })
  duration: number
}

/*
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
*/

@Entity()
export class Trip extends BaseEntity implements  {

  @PrimaryGeneratedColumn()
  id: number

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