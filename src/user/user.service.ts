import { Injectable } from '@nestjs/common'
import { hash } from 'argon2'
import { AuthDto } from 'src/auth/dto/auth.dto'
import { PrismaService } from 'src/prisma.service'
import { UserDto } from './dto/user.dto'

@Injectable()
export class UserService {
	constructor(private prisma: PrismaService) {}

	getById(id: string) {
		return this.prisma.user.findUnique({
			where: {
				id
			}
		})
	}

	getByEmail(email: string) {
		return this.prisma.user.findUnique({
			where: {
				email
			}
		})
	}

	async getProfile(id: string) {
		const profile = await this.getById(id)
		
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const { password, ...rest } = profile

		return {
			user: rest
		}
	}

	async update(id: string, dto: UserDto) {
		let data = dto

		if (dto.password) {
			data = { ...dto, password: await hash(dto.password) }
		}

		return this.prisma.user.update({
			where: {
				id
			},
			data,
			select: {
				name: true,
				email: true
			}
		})
	}
}
