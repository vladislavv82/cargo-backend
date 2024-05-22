import { PartialType } from '@nestjs/mapped-types'
import { CreateTransportDto } from './create-transport.dto'
import { IsOptional, IsString, IsDateString } from 'class-validator'

export class UpdateTransportDto {
	@IsDateString()
    @IsOptional()
	startPeriodRoadPass?: Date

	@IsDateString()
    @IsOptional()
	endPeriodRoadPass?: Date

	@IsString()
	driverId: string
}
