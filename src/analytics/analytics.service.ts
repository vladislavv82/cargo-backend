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
		const todayStart = startOfDay(new Date())
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
				{ label: 'trips total', value: tripsTotal },
				{ label: 'expense sum', value: expenseSum._sum.amountConsumption },
				{ label: 'trip amount sum', value: tripAmountSum._sum.tripAmount },
				{ label: 'profit', value: profit }
			]
		}
	}

	async getDriverStatistics(driverId: string) {
		const todayStart = startOfDay(new Date())
		const monthStart = startOfDay(subDays(new Date(), 31))

		const tripsTotal = await this.prisma.trip.count({
			where: {
				id: driverId,
				createdAt: {
					gte: monthStart.toISOString()
				}
			}
		})

		const expenseSum = await this.prisma.expense.aggregate({
			where: {
				id: driverId,
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
				id: driverId,
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
				{ label: 'trips total', value: tripsTotal },
				{ label: 'expense sum', value: expenseSum._sum.amountConsumption },
				{ label: 'trip amount sum', value: tripAmountSum._sum.tripAmount },
				{ label: 'profit', value: profit }
			]
		}
	}
}
