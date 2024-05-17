import { Injectable } from '@nestjs/common'
import { startOfDay, subDays } from 'date-fns'
import { PrismaService } from 'src/prisma.service'

@Injectable()
export class AnalyticsService {
	constructor(private prisma: PrismaService) {}

	//В данном сервисе обращение к таблицам происходят на прямую
	//Разнести по сервисам и вызывать оттуда


	//Возможно добавиться % водителя
	private calculateProfit(tripAmount: number, expenseSum: number): number {
		return tripAmount - expenseSum
	}

	async getGeneralStatistics() {
		const monthStart = startOfDay(subDays(new Date(), 31))

		const tripsTotal = await this.prisma.trip.count({
			where: {
				createdAt: {
					gte: monthStart.toISOString()
				}
			}
		})

		const expenseSum = await this.prisma.expense.aggregate({
			where: {
				createdAt: {
					gte: monthStart.toISOString()
				}
			},
			_sum: {
				amountConsumption: true
			}
		})

		const tripAmountSum = await this.prisma.trip.aggregate({
			where: {
				createdAt: {
					gte: monthStart.toISOString()
				}
			},
			_sum: {
				tripAmount: true
			}
		})

		const profit = this.calculateProfit(
			tripAmountSum._sum.tripAmount,
			expenseSum._sum.amountConsumption
		)

		return {
			statistics: [
				{ label: 'Количество перевозок', value: tripsTotal },
				{ label: 'Доход', value: tripAmountSum._sum.tripAmount },
				{ label: 'Прибыль', value: profit },
				{ label: 'Расходы', value: expenseSum._sum.amountConsumption }
			]
		}
	}

	async getDriverStatistics(driverId: string) {
		const monthStart = startOfDay(subDays(new Date(), 31))

		const tripsTotal = await this.prisma.trip.count({
			where: {
				driverId: driverId,
				createdAt: {
					gte: monthStart.toISOString()
				}
			}
		})

		const expenseSum = await this.prisma.expense.aggregate({
			where: {
				driverId: driverId,
				createdAt: {
					gte: monthStart.toISOString()
				}
			},
			_sum: {
				amountConsumption: true
			}
		})

		const tripAmountSum = await this.prisma.trip.aggregate({
			where: {
				driverId: driverId,
				createdAt: {
					gte: monthStart.toISOString()
				}
			},
			_sum: {
				tripAmount: true
			}
		})

		const profit = this.calculateProfit(
			tripAmountSum._sum.tripAmount,
			expenseSum._sum.amountConsumption
		)

		return {
			statistics: [
				{ label: 'Количество перевозок', value: tripsTotal },
				{ label: 'Доход', value: tripAmountSum._sum.tripAmount },
				{ label: 'Прибыль', value: profit },
				{ label: 'Расходы', value: expenseSum._sum.amountConsumption }
			]
		}
	}
}
