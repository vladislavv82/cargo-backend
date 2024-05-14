import { Module } from '@nestjs/common';
import { DriverService } from './driver.service';
import { PrismaService } from 'src/prisma.service';
import { DriversController } from './driver.controller';

@Module({
  controllers: [DriversController],
  providers: [DriverService, PrismaService],
  exports: [DriverService],
})
export class DriverModule {}
