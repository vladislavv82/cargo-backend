import { PartialType } from '@nestjs/swagger';
import { CreateExpenseDto } from './create-expense.dto';
import { IsNumber, IsOptional } from 'class-validator';

export class UpdateExpenseDto extends PartialType(CreateExpenseDto) {
    @IsOptional()
    @IsNumber()
    amountConsumption: number;
}
