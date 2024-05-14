import { IsOptional, IsString } from "class-validator";

export class CreateDriverDto {
    @IsString()
    fullName: string;

    @IsString()
    licenseNumber: string;

    @IsString()
    passportNumber: string;

    @IsString()
    @IsOptional()
    phoneNumber?: string;
}
