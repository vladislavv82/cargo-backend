import {
	Controller,
	Post,
	Body,
	HttpCode,
	UsePipes,
	ValidationPipe,
	Delete,
	Param,
	Put,
	Get
} from '@nestjs/common'
import { Auth } from 'src/auth/decorators/auth.decorator'
import { CreateTripDto } from './dto/create-trip.dto'
import { TripService } from './trip.service'
import { UpdateTripDto } from './dto/update-trip.dto'
import { CurrentUser } from 'src/auth/decorators/user.decorator'

@Controller('trip')
export class TripController {
	constructor(private readonly tripService: TripService) {}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Post()
	@Auth()
	async createTrip(@Body() dto: CreateTripDto) {
		return this.tripService.createTrip(dto)
	}

	@Get()
	@Auth()
	async getAllTrips() {
		return this.tripService.getAllTrips()
	}

	@HttpCode(200)
	@Get(':id')
	@Auth()
	async findOneTrip(@Param('id') id: string) {
		return this.tripService.findOneTrip(id)
	}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Put(':id')
	@Auth()
	async update(
		@Body() dto: UpdateTripDto,
		@Param('id') tripId: string
	) {
		return this.tripService.updateTrip(dto, tripId)
	}

	@HttpCode(200)
	@Delete(':id')
	@Auth()
	async deleteTrip(@Param('id') tripId: string) {
		return this.tripService.deleteTrip(tripId)
	}
}
