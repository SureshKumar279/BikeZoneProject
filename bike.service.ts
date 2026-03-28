import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Bike } from './bike.entity';

@Injectable()
export class BikeService {
  constructor(
    @InjectRepository(Bike)
    private bikeRepo: Repository<Bike>,
  ) {}

  async create(data: any) {
    const bike = this.bikeRepo.create(data);
    return this.bikeRepo.save(bike);
  }

  async findAll() {
    return this.bikeRepo.find();
  }

  async findOne(id: number) {
    const bike = await this.bikeRepo.findOne({ where: { id } });
    if (!bike) throw new NotFoundException('Bike not found');
    return bike;
  }

  async update(id: number, data: any) {
    await this.bikeRepo.update(id, data);
    return this.findOne(id);
  }

  async remove(id: number) {
    const bike = await this.findOne(id);
    return this.bikeRepo.remove(bike);
  }
}
