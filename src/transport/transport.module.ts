import { Module } from '@nestjs/common';
import { TransportService } from './transport.service';
import { PrismaService } from 'src/prisma.service'
import { TransportController } from './transport.controller';

@Module({
  controllers: [TransportController],
  providers: [TransportService, PrismaService],
})
export class TransportModule {}
