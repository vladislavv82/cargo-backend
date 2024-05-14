import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete,
	HttpCode,
	UsePipes,
	ValidationPipe,
	Put
} from '@nestjs/common'
import { ExpenseService } from './expense.service'
import { Auth } from 'src/auth/decorators/auth.decorator'
import { CreateExpenseDto } from './dto/create-expense.dto'

@Controller('expense')
export class ExpenseController {
	constructor(private readonly expenseService: ExpenseService) {}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Post(':id')
	@Auth()
	async create(@Body() dto: CreateExpenseDto, @Param('id') driverId: string) {
		return this.expenseService.createExpense(dto, driverId)
	}

	@HttpCode(200)
	@Get()
	@Auth()
	async getAllExpenses() {
		return this.expenseService.getAllExpenses()
	}

	@HttpCode(200)
	@Get(':id')
	@Auth()
	async findOneExpense(@Param('id') id: string) {
		return this.expenseService.findOneExpense(id)
	}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Put(':id')
	@Auth()
	async updateExpense(@Body() dto: CreateExpenseDto, @Param('id') driverId: string) {
		return this.expenseService.updateExpense(dto, driverId)
	}

	@HttpCode(200)
	@Delete(':id')
	@Auth()
	async delete(@Param('id') id: string) {
		return this.expenseService.deleteExpense(id)
	}
}
