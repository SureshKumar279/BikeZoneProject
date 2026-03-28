 import { Controller, Post, Body, Get, Param, Patch, NotFoundException, UseGuards, Req } from '@nestjs/common';
 import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { BookingService } from './booking.service';
import { UserService } from '../user/user.service';
import { BikeService } from '../bike/bike.service';

@Controller('bookings')
export class BookingController {
  constructor(
    private bookingService: BookingService,
    private userService: UserService,
    private bikeService: BikeService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() body: any, @Req() req: any) {
    // body: { bikeId, date }
    // user is extracted from JWT token
    try {
      const user = await this.userService.findOne(req.user.id);
      const bike = await this.bikeService.findOne(body.bikeId);
      
      if (!bike.available) {
        throw new NotFoundException('Bike is not available');
      }
      
      return await this.bookingService.create(user, bike, body.date);
    } catch (error) {
      throw error;
    }
  }

  @Get()
  findAll() {
    return this.bookingService.findAll();//sarri booking list dyga 
  }

  @UseGuards(JwtAuthGuard)
  @Get('user/:userId')
  findByUser(@Param('userId') userId: number) {
    return this.bookingService.findByUser(+userId);//yh ak 3 ki booking deta ha 
  
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  updateStatus(@Param('id') id: number, @Body() body: any) {
    // body: { status: 'approved' | 'rejected' }
    return this.bookingService.updateStatus(+id, body.status);
  }
}
