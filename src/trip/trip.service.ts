import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { CreateTripDto } from './dto/create-trip.dto'
import { PrismaService } from 'src/prisma.service'
import { UpdateTripDto } from './dto/update-trip.dto'

@Injectable()
export class TripService {
	constructor(private prisma: PrismaService) {}

	async createTrip(dto: CreateTripDto) {
		try {
			const { driverId, ...tripData } = dto

			return await this.prisma.trip.create({
				data: {
					...tripData,
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

	async getAllTrips() {
		try {
			const trips = await this.prisma.trip.findMany({
				include: {
					Driver: true
				}
			})

			if (trips.length === 0) {
				throw new HttpException('Поездки не найдены', HttpStatus.NOT_FOUND)
			}
			return trips
		} catch (error) {
			if (error instanceof HttpException) {
				throw error
			} else {
				throw new HttpException(
					'Error retrieving trips',
					HttpStatus.INTERNAL_SERVER_ERROR
				)
			}
		}
	}

	async findOneTrip(tripId: string) {
		try {
			const trip = await this.prisma.trip.findUnique({
				where: {
					id: tripId
				},
				include: {
					Driver: true
				}

			})

			if (!trip) {
				throw new HttpException('Trip not found', HttpStatus.NOT_FOUND)
			}

			return trip
		} catch (error) {
			if (error instanceof HttpException) {
				throw error
			} else {
				throw new HttpException(
					'Error retrieving trip',
					HttpStatus.INTERNAL_SERVER_ERROR
				)
			}
		}
	}

	async updateTrip(dto: UpdateTripDto, tripId: string) {
		try {
			return await this.prisma.trip.update({
				where: {
					id: tripId
				},
				data: dto
			})
		} catch (error) {
			throw new HttpException('Trip not found', HttpStatus.NOT_FOUND)
		}
	}

	async deleteTrip(tripId: string) {
		try {
			await this.prisma.trip.delete({
				where: {
					id: tripId
				}
			})
			return { message: 'Поездка успешно удалена' }
		} catch (error) {
			throw new HttpException('Trip not found', HttpStatus.NOT_FOUND)
		}
	}
}
