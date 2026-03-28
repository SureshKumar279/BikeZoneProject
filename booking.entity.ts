import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from '../user/user.entity';
import { Bike } from '../bike/bike.entity';

@Entity()
export class Booking {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, { eager: true })
  user: User;

  @ManyToOne(() => Bike, { eager: true })
  bike: Bike;

  @Column({ type: 'date' })
  date: string;

  @Column({ default: 'pending' })
  status: string; // pending / approved / rejected
}
