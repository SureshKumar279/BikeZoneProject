 import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Booking } from './booking.entity';
import { User } from '../user/user.entity';
import { Bike } from '../bike/bike.entity';
import { BikeService } from '../bike/bike.service';

@Injectable()
export class BookingService {
constructor(
  @InjectRepository(Booking)
  private bookingRepo: Repository<Booking>,
  private bikeService: BikeService,
) {}


  async create(user: User, bike: Bike, date: string) {
    // Create the booking
    const booking = this.bookingRepo.create({ user, bike, date });
    const savedBooking = await this.bookingRepo.save(booking);
    
    // Update bike availability
    await this.bikeService.update(bike.id, { available: false });
    
    return savedBooking;
  }

  async findAll() {
    return this.bookingRepo.find({
      relations: ['user', 'bike'],
    });
  }

  async findByUser(userId: number) {
    return this.bookingRepo.find({ 
      where: { user: { id: userId } },
      relations: ['user', 'bike'],
    });
  }

  async updateStatus(id: number, status: string) {
    const booking = await this.bookingRepo.findOne({ 
      where: { id },
      relations: ['user', 'bike'],
    });
    if (!booking) throw new NotFoundException('Booking not found');
    booking.status = status;
    
    // If booking is cancelled, make bike available again
    if (status === 'cancelled') {
      await this.bikeService.update(booking.bike.id, { available: true });
    }
    
    return this.bookingRepo.save(booking);
  }
}
