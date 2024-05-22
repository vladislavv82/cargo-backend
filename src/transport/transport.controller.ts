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
import { Auth } from 'src/auth/decorators/auth.decorator'
import { TransportService } from './transport.service'
import { CurrentUser } from 'src/auth/decorators/user.decorator'
import { CreateTransportDto } from './dto/create-transport.dto'
import { UpdateTransportDto } from './dto/update-transport.dto'

@Controller('transport')
export class TransportController {
	constructor(private readonly transportService: TransportService) {}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Post()
	@Auth()
	createTransport(
		@Body() createTransportDto: CreateTransportDto,
		@CurrentUser('id') userId: string
	) {
		return this.transportService.create(createTransportDto, userId)
	}

	@Get()
	@Auth()
	async getAllTransport(@CurrentUser('id') userId: string) {
		return this.transportService.getAll(userId)
	}

	@Get('/liberty')
	@Auth()
	async getLibertyTransport(@CurrentUser('id') userId: string) {
		return this.transportService.getLibertyTransport(userId)
	}

	@HttpCode(200)
	@Get(':id')
	@Auth()
	async findOneTransport(@Param('id') id: string) {
		return this.transportService.findOne(id)
	}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Put(':id')
	@Auth()
	async updateTransport(
		@Body() dto: UpdateTransportDto,
		@Param('id') id: string
	) {
		return this.transportService.update(dto, id)
	}

	@HttpCode(200)
	@Delete(':id')
	@Auth()
	async deleteTransport(@Param('id') id: string) {
		return this.transportService.delete(id)
	}
}
