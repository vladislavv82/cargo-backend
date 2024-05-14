import { PartialType } from '@nestjs/mapped-types';
import { CreateTripDto } from './create-trip.dto';
import { IsEnum, IsOptional, IsString, IsDateString, IsNumber} from 'class-validator'
import { Transform } from 'class-transformer'
import { Status } from '@prisma/client';

export class UpdateTripDto extends PartialType(CreateTripDto) {
    @IsString()
    driverId: string; // Добавлено для хранения полного имени водителя

    @IsString()
    route: string; // Маршрут

    @IsDateString()
    loadingDate: Date; //Дата загрузки

    @IsDateString()
    unloadingDate: Date; //Дата выгрузки

    @IsNumber()
    tripAmount: number; //Сумма перевозки

    @IsEnum(Status)
    @Transform(({ value }) => ('' + value).toLowerCase())
    status: Status;  //Сатус перевозки
}
