import { BaseEntity, ChildEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, TableInheritance, UpdateDateColumn } from 'typeorm'
import { Location as GraphqlLocation, LocationType, Trip as GraphqlTrip } from '../graphql/schema.types'
import { Day } from './Day'

@Entity()
@TableInheritance({ column: { type: "varchar", name: "type" } })
export class Location extends BaseEntity implements GraphqlLocation {

  @PrimaryGeneratedColumn()
  id: number

  @CreateDateColumn({select: false})
  timeCreated: Date

  @UpdateDateColumn({select: false})
  timeUpdated: Date

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

  @ManyToOne(() => Day, day => day.locations)
  @JoinColumn()
  day: Day
}

@ChildEntity()
export class Departure extends Location implements GraphqlLocation {

  @Column({
    length: 100,
  })
  departure: string
}

@ChildEntity()
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

@ChildEntity()
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

  @CreateDateColumn({select: false})
  timeCreated: Date

  @UpdateDateColumn({select: false})
  timeUpdated: Date

  @Column({
    length: 100,
  })
  transportation: string

  @Column()
  duration: number

  @Column()
  cost: number

  @ManyToOne(() => Day, day => day.trips)
  @JoinColumn()
  day: Day
}