import { Injectable, Logger } from '@nestjs/common'
import { HttpException, HttpStatus } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { CreateTransportDto } from './dto/create-transport.dto'
import { UpdateTransportDto } from './dto/update-transport.dto'

@Injectable()
export class TransportService {
	//TODO выводить логи в файл
	private readonly logger = new Logger(TransportService.name);
	
	constructor(private prisma: PrismaService) {}

	async create(dto: CreateTransportDto, userId: string) {
		try {
			return await this.prisma.transport.create({
				data: {
					...dto,
					User: {
						connect: {
							id: userId
						}
					}
				}
			})
		} catch (error) {
			if (error.code === 'P2002') {
				throw new HttpException(
					'Transport already exists',
					HttpStatus.BAD_REQUEST
				)
			} else {
				throw new HttpException(
					'Internal server error',
					HttpStatus.INTERNAL_SERVER_ERROR
				)
			}
		}
	}

	async getAll(userId: string) {
		try {
			const transport = await this.prisma.transport.findMany({
				where: {
					userId
				}
			})

			if (transport.length === 0) {
				throw new HttpException(
					'No transports found for the user',
					HttpStatus.NOT_FOUND
				)
			}
			return transport
		} catch (error) {
			if (error instanceof HttpException) {
				throw error
			} else {
				throw new HttpException(
					'Error retrieving transports',
					HttpStatus.INTERNAL_SERVER_ERROR
				)
			}
		}
	}

	async getLibertyTransport(userId: string) {
		try {
			const transport = await this.prisma.transport.findMany({
				where: {
					userId: userId,
					driverId: null
				}
			})

			if (transport.length === 0) {
				throw new HttpException(
					'No transports found for the user',
					HttpStatus.NOT_FOUND
				)
			}
			return transport
		} catch (error) {
			if (error instanceof HttpException) {
				throw error
			} else {
				throw new HttpException(
					'Error retrieving transports',
					HttpStatus.INTERNAL_SERVER_ERROR
				)
			}
		}
	}

	async findOne(transportId: string) {
		try {
			const transport = await this.prisma.transport.findUnique({
				where: {
					id: transportId
				},
				include: {
					Driver: true
				}
			})

			if (!transport) {
				throw new HttpException('Transport not found', HttpStatus.NOT_FOUND)
			}

			return transport
		} catch (error) {
			if (error instanceof HttpException) {
				throw error
			} else {
				throw new HttpException(
					'Error retrieving transport',
					HttpStatus.INTERNAL_SERVER_ERROR
				)
			}
		}
	}

	async update(
		dto: UpdateTransportDto,
		transportId: string
	) {
		try {
			return await this.prisma.transport.update({
				where: {
					id: transportId
				},
				data: dto
			})
		} catch (error) {
			this.logger.error(`Failed to update transport with ID ${transportId}`, error.stack);
			throw new HttpException('Error updating transport', HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	async delete(transportId: string) {
		try {
			await this.prisma.transport.delete({
				where: {
					id: transportId
				}
			})
			return { message: 'Транспорт успешно удален' }
		} catch (error) {
			throw new HttpException('Transport not found', HttpStatus.NOT_FOUND)
		}
	}
}
