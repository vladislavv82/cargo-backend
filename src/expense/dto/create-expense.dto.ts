import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateExpenseDto {
    @IsOptional()
    @IsNumber()
    amountConsumption: number;
}