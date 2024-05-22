import { PartialType } from '@nestjs/swagger';
import { CreateDriverDto } from './create-driver.dto';
import { IsString } from 'class-validator';

export class UpdateDriverDto extends PartialType(CreateDriverDto) {
    @IsString()
    fullName: string;

    @IsString()
    licenseNumber: string;

    @IsString()
    passportNumber: string;

    @IsString()
    phoneNumber?: string;
}
