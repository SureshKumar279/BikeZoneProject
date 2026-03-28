 import { Controller, Get, Post, Body, Param, Put, Delete, UseGuards } from '@nestjs/common';
 import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { BikeService } from './bike.service';

@Controller('bikes')
export class BikeController {
  constructor(private bikeService: BikeService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() body: any) {
    return this.bikeService.create(body);
  }

  @Get()
  findAll() {
    return this.bikeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.bikeService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  update(@Param('id') id: number, @Body() body: any) {
    return this.bikeService.update(id, body);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.bikeService.remove(id);
  }
}
