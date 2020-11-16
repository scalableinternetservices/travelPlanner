import { integer } from 'aws-sdk/clients/cloudfront'
import { float } from 'aws-sdk/clients/lightsail'
import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'
import { ItineraryType, User as GraphqlUser, UserType } from '../graphql/schema.types'

@Entity()
export class Itinerary extends BaseEntity implements GraphqlUser {
  __typename?: 'User' | undefined
  userType: UserType
  email: string
  name: string
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
export class Day extends BaseEntity implements GraphqlUser {
  __typename?: 'User' | undefined
  userType: UserType
  email: string
  name: string
  @PrimaryGeneratedColumn()
  id: number

  @CreateDateColumn()
  timeCreated: Date

  @UpdateDateColumn()
  timeUpdated: Date

  @Column()
  day: integer

  @Column({
    length: 100,
  })
  date: string

  @Column()
  schedule: Location[]
}

@Entity()
class Location extends BaseEntity implements GraphqlUser {
  __typename?: 'User' | undefined
  userType: UserType
  email: string
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
export class Stop extends Location implements GraphqlUser {
  __typename?: 'User' | undefined
  userType: UserType
  email: string
  @Column({
    length: 100,
  })
  arrival: string

  @Column({
    length: 100,
  })
  departure: string

  @Column()
  duration: integer
}

@Entity()
export class Departure extends Location implements GraphqlUser {
  __typename?: 'User' | undefined
  userType: UserType
  email: string
  @Column({
    length: 100,
  })
  departure: string
}

@Entity()
export class Arrival extends Location implements GraphqlUser {
  __typename?: 'User' | undefined
  userType: UserType
  email: string
  @Column({
    length: 100,
  })
  arrival: string
}

@Entity()
export class Trip extends Location implements GraphqlUser {
  __typename?: 'User' | undefined
  userType: UserType
  email: string
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
  duration: integer

  @Column({
    length: 100,
  })
  cost: float
}