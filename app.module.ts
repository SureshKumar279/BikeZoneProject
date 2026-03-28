 import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { BikeModule } from './bike/bike.module';
import { BookingModule } from './booking/booking.module';
import { User } from './user/user.entity';
import { Bike } from './bike/bike.entity';
import { Booking } from './booking/booking.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'suresh@123',
      database: 'bikezone_db',
      logging: true,
      entities: [ User,Bike,Booking],
      autoLoadEntities: true,//module ki enetity auto updated
      synchronize: true, //schema auto_updated
    }),
    UserModule,
    AuthModule,
    BikeModule,
    BookingModule,
  ],
})
export class AppModule {}
