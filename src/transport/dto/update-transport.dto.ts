import { PartialType } from '@nestjs/mapped-types';
import { CreateTransportDto } from './create-transport.dto';
import { IsEnum, IsOptional, IsString, IsDateString  } from 'class-validator'
import { Transform } from 'class-transformer'
import { TypeTransport } from '@prisma/client';

export class UpdateTransportDto extends PartialType(CreateTransportDto) {

    @IsOptional()
    @IsDateString()
    startPeriodRoadPass?: Date;
  
    @IsOptional()
    @IsDateString()
    endPeriodRoadPass?: Date;

    @IsString()
    driverId: string;
}
