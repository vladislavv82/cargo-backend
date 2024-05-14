import { IsEnum, IsOptional, IsString, IsDateString  } from 'class-validator'
import { Transform } from 'class-transformer'
import { TypeTransport } from '@prisma/client';

export class CreateTransportDto {
    @IsEnum(TypeTransport)
	@Transform(({ value }) => ('' + value).toLowerCase())
    type: TypeTransport;
  
    @IsOptional()
    @IsDateString()
    startPeriodRoadPass?: Date;
  
    @IsOptional()
    @IsDateString()
    endPeriodRoadPass?: Date;
  
    @IsString()
    registrationNumber: string;
  
    @IsString()
    transportModel: string;
  }