import { BaseEntity, ChildEntity, Column, Entity, PrimaryGeneratedColumn, TableInheritance } from 'typeorm'
import { Location as GraphqlLocation, LocationType, Trip as GraphqlTrip } from '../graphql/schema.types'

@Entity()
@TableInheritance({ column: { type: "varchar", name: "type" } })
export class Location extends BaseEntity implements GraphqlLocation {

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
}

// export abstract class Location extends BaseEntity implements GraphqlLocation {

//   @PrimaryGeneratedColumn()
//   id: number

//   @Column({
//     type: 'enum',
//     enum: LocationType
//   })
//   type: LocationType

//   @Column({
//     length: 100,
//   })
//   name: string

//   @Column({
//     length: 100,
//   })
//   address: string

//   @Column({
//     length: 100,
//   })
//   coordinates: string

//   @Column({
//     length: 100,
//     nullable: true,
//   })
//   arrival: string

//   @Column({
//     length: 100,
//     nullable: true,
//   })
//   departure: string

//   @Column({
//     nullable: true,
//   })
//   duration: number
// }

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
export class Departure extends Location implements GraphqlLocation {

  @Column({
    length: 100,
  })
  departure: string
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

  @Column({
    length: 100,
  })
  transportation: string

  @Column()
  duration: number

  @Column()
  cost: number
}