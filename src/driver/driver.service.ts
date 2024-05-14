import { HttpException, HttpStatus } from '@nestjs/common'
import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { CreateDriverDto } from './dto/create-driver.dto'
import { UpdateDriverDto } from './dto/update-driver.dto'

@Injectable()
export class DriverService {
	constructor(private prisma: PrismaService) {}

	async createDriver(dto: CreateDriverDto, userId: string) {
		try {
			return await this.prisma.driver.create({
				data: {
					...dto,
					user: {
						connect: {
							id: userId
						}
					}
				}
			})
		} catch (error) {
			if (error.code === 'P2002') {
				// Ошибка уникальности.
				throw new HttpException('Driver already exists', HttpStatus.BAD_REQUEST)
			} else {
				// Обработка других видов ошибок, если такие есть
				throw new HttpException(
					'Internal server error',
					HttpStatus.INTERNAL_SERVER_ERROR
				)
			}
		}
	}

	async getAllDrivers(userId: string) {
		try {
			const drivers = await this.prisma.driver.findMany({
				where: {
					userId
				},
				include: {
					transport: true
				}
			})

			if (drivers.length === 0) {
				throw new HttpException(
					'No drivers found for the user',
					HttpStatus.NOT_FOUND
				)
			}
			return drivers
		} catch (error) {
			if (error instanceof HttpException) {
				throw error
			} else {
				throw new HttpException(
					'Error retrieving drivers',
					HttpStatus.INTERNAL_SERVER_ERROR
				)
			}
		}
	}

	async findOneDriver(driverId: string) {
		try {
			const driver = await this.prisma.driver.findUnique({
				where: {
					id: driverId
				},
				include: {
					transport: true,
					trips: true,
					expense: true,
				}
			})

			if (!driver) {
				throw new HttpException('Водитель не найден', HttpStatus.NOT_FOUND)
			}

			return driver
		} catch (error) {
			if (error instanceof HttpException) {
				throw error
			} else {
				throw new HttpException(
					'Error retrieving driver',
					HttpStatus.INTERNAL_SERVER_ERROR
				)
			}
		}
	}

	async updateDriver(
		dto: Partial<CreateDriverDto>,
		driverId: string,
		userId: string
	) {
		try {
			return await this.prisma.driver.update({
				where: {
					userId,
					id: driverId
				},
				data: dto
			})
		} catch (error) {
			throw new HttpException('Водитель не найден', HttpStatus.NOT_FOUND)
		}
	}

	async deleteDriver(driverId: string) {
		try {
			await this.prisma.driver.delete({
				where: {
					id: driverId
				}
			})
			return { message: 'Водитель успешно удален' }
		} catch (error) {
			throw new HttpException('Driver not found', HttpStatus.NOT_FOUND)
		}
	}
}
