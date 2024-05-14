import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { CreateExpenseDto } from './dto/create-expense.dto'
import { UpdateExpenseDto } from './dto/update-expense.dto'

@Injectable()
export class ExpenseService {
	constructor(private prisma: PrismaService) {}

	async createExpense(dto: CreateExpenseDto, driverId: string) {
		try {
			return await this.prisma.expense.create({
				data: {
					...dto,
					Driver: {
						connect: {
							id: driverId
						}
					}
				}
			})
		} catch (error) {
			throw new HttpException(
				'Internal server error',
				HttpStatus.INTERNAL_SERVER_ERROR
			)
		}
	}

    async getAllExpenses() {
		try {
			const expenses = await this.prisma.expense.findMany({
                include: {
					Driver: true
				}
            })

			if (expenses.length === 0) {
				throw new HttpException('Поездки не найдены', HttpStatus.NOT_FOUND)
			}
			return expenses
		} catch (error) {
			if (error instanceof HttpException) {
				throw error
			} else {
				throw new HttpException(
					'Error retrieving expenses',
					HttpStatus.INTERNAL_SERVER_ERROR
				)
			}
		}
	}

	async findOneExpense(expenseId: string) {
		try {
			const expense = await this.prisma.expense.findUnique({
				where: {
					id: expenseId
				},
				include: {
					Driver: true
				}

			})

			if (!expense) {
				throw new HttpException('Expense not found', HttpStatus.NOT_FOUND)
			}

			return expense
		} catch (error) {
			if (error instanceof HttpException) {
				throw error
			} else {
				throw new HttpException(
					'Error retrieving expense',
					HttpStatus.INTERNAL_SERVER_ERROR
				)
			}
		}
	}

	async updateExpense(dto: UpdateExpenseDto, expenseId: string) {
		try {
			return await this.prisma.expense.update({
				where: {
					id: expenseId
				},
				data: dto
			})
		} catch (error) {
			throw new HttpException('Expense not found', HttpStatus.NOT_FOUND)
		}
	}

	async deleteExpense(expenseId: string) {
		try {
			await this.prisma.expense.delete({
				where: {
					id: expenseId
				}
			})
			return { message: 'Расход успешно удален' }
		} catch (error) {
			throw new HttpException('Expense not found', HttpStatus.NOT_FOUND)
		}
	}
}
