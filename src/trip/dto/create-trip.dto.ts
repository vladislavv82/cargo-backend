import { IsEnum, IsOptional, IsString, IsDateString, IsNumber} from 'class-validator'
import { Transform } from 'class-transformer'
import { Status } from '@prisma/client';

export class CreateTripDto {

    @IsString()
    driverId: string; 

    @IsString()
    route: string; // Маршрут

    @IsDateString()
    loadingDate: Date; //Дата загрузки

    @IsOptional()
    @IsDateString()
    unloadingDate: Date; //Дата выгрузки

    @IsNumber()
    tripAmount: number; //Сумма перевозки

    @IsEnum(Status)
    @Transform(({ value }) => ('' + value).toLowerCase())
    status: Status;  //Сатус перевозки

}
