import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, UsePipes, ValidationPipe, Put } from '@nestjs/common';
import { Auth } from 'src/auth/decorators/auth.decorator'
import { CurrentUser } from 'src/auth/decorators/user.decorator'
import { DriverService } from './driver.service';
import { CreateDriverDto } from './dto/create-driver.dto';
import { UpdateDriverDto } from './dto/update-driver.dto';

@Controller('driver')
export class DriversController {
  constructor(private readonly driversService: DriverService) {}

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post()
  @Auth()
  async createDriver(@Body() dto: CreateDriverDto, @CurrentUser('id') userId: string) {
    return this.driversService.createDriver(dto, userId);
  } 

  @HttpCode(200)
  @Get()
  @Auth()
  async getAllDrivers(@CurrentUser('id') userId: string) {
    return this.driversService.getAllDrivers(userId);
  }

  @HttpCode(200)
  @Get(':id')
  @Auth()
  async findOneDriver(@Param('id') id: string) {
    return this.driversService.findOneDriver(id);
  }

  @UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Put(':id')
	@Auth()
	async updateDriver(
		@Body() dto: CreateDriverDto,
		@CurrentUser('id') userId: string,
		@Param('id') id: string
	) {
		return this.driversService.updateDriver(dto, id, userId)
	}

  @HttpCode(200)
	@Delete(':id')
	@Auth()
	async deleteDriver(@Param('id') id: string) {
		return this.driversService.deleteDriver(id)
	}
}
