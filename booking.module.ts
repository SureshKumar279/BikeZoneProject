import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Booking } from './booking.entity';
import { BookingService } from './booking.service';
import { BookingController } from './booking.controller';
import { UserModule } from '../user/user.module';
import { BikeModule } from '../bike/bike.module';

@Module({
  imports: [TypeOrmModule.forFeature([Booking]), UserModule, BikeModule],
  providers: [BookingService],
  controllers: [BookingController],
})
export class BookingModule {}
