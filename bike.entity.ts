import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Bike {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  brand: string;

  @Column()
  modelYear: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true, default: 0 })
  price: number;

  @Column({ default: true })
  available: boolean;
}
