import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'
import { Day as GraphqlDay, Itinerary as GraphqlItinerary, Location as GraphqlLocation, LocationType, Trip as GraphqlTrip } from '../graphql/schema.types'

@Entity()
export class Itinerary extends BaseEntity implements GraphqlItinerary {

  @PrimaryGeneratedColumn()
  id: number

  @CreateDateColumn()
  timeCreated: Date

  @UpdateDateColumn()
  timeUpdated: Date

  @Column()
  days: number[]

  // @Column({
  //   length: 100,
  // })
  // day1: number

  // @Column({
  //   length: 100,
  //   nullable: true,
  // })
  // day2: number

  // @Column({
  //   length: 100,
  //   nullable: true,
  // })
  // day3: number

  // @Column({
  //   length: 100,
  //   nullable: true,
  // })
  // day4: number

  // @Column({
  //   length: 100,
  //   nullable: true,
  // })
  // day5: number
}

@Entity()
export class Day extends BaseEntity implements GraphqlDay {

  @PrimaryGeneratedColumn()
  id: number

  @CreateDateColumn()
  timeCreated: Date

  @UpdateDateColumn()
  timeUpdated: Date

  @Column()
  day_no: number

  @Column({
    length: 100,
  })
  date: string

  @Column()
  locations: number[]

  @Column()
  trips: number[]

  // @Column({
  //   length: 100,
  // })
  // location1: number

  // @Column({
  //   length: 100,
  //   nullable: true
  // })
  // trip1: number

  // @Column({
  //   length: 100,
  //   nullable: true,
  // })
  // location2: number

  // @Column({
  //   length: 100,
  //   nullable: true
  // })
  // trip2: number

  // @Column({
  //   length: 100,
  //   nullable: true,
  // })
  // location3: number

  // @Column({
  //   length: 100,
  //   nullable: true
  // })
  // trip3: number

  // @Column({
  //   length: 100,
  //   nullable: true,
  // })
  // location4: number

  // @Column({
  //   length: 100,
  //   nullable: true
  // })
  // trip4: number

  // @Column({
  //   length: 100,
  //   nullable: true,
  // })
  // location5: number
}

export abstract class Location extends BaseEntity implements GraphqlLocation {

  @PrimaryGeneratedColumn()
  id: number

  @Column({
    type: 'enum',
    enum: LocationType
  })
  type: LocationType

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

@Entity()
export class Stop extends Location implements GraphqlLocation {

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
export class Departure extends Location implements GraphqlLocation {

  @Column({
    length: 100,
  })
  departure: string
}

@Entity()
export class Arrival extends Location implements GraphqlLocation {

  @Column({
    length: 100,
  })
  arrival: string
}

@Entity()
export class Trip extends BaseEntity implements GraphqlTrip {

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