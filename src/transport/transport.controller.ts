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
	create(
		@Body() createTransportDto: CreateTransportDto,
		@CurrentUser('id') userId: string
	) {
		return this.transportService.create(createTransportDto, userId)
	}

	@Get()
	@Auth()
	async getAll(@CurrentUser('id') userId: string) {
		return this.transportService.getAll(userId)
	}

	@HttpCode(200)
	@Get(':id')
	@Auth()
	async findOne(@Param('id') id: string) {
		return this.transportService.findOne(id)
	}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Put(':id')
	@Auth()
	async update(
		@Body() dto: UpdateTransportDto,
		@CurrentUser('id') userId: string,
		@Param('id') id: string
	) {
		return this.transportService.update(dto, id, userId)
	}

	@HttpCode(200)
	@Delete(':id')
	@Auth()
	async delete(@Param('id') id: string) {
		return this.transportService.delete(id)
	}
}
