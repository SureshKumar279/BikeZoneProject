import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BikeController } from './bike.controller';
import { Bike } from './bike.entity';
import { BikeService } from './bike.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Bike]),
  ],
  providers: [BikeService],
  controllers: [BikeController],
  exports: [BikeService],
})
export class BikeModule {}
