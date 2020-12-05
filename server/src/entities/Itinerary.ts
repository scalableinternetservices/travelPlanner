import { BaseEntity, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'
import { Itinerary as GraphqlItinerary } from '../graphql/schema.types'
import { Day } from './Day'

@Entity()
export class Itinerary extends BaseEntity implements GraphqlItinerary {

  @PrimaryGeneratedColumn()
  id: number

  @PrimaryColumn()
  user_id: number

  @CreateDateColumn()
  timeCreated: Date

  @UpdateDateColumn()
  timeUpdated: Date

  @OneToOne(() => Day)
  @JoinColumn()
  day: Day
}