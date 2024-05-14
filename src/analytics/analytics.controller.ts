import { Controller, Get, HttpCode, Param } from '@nestjs/common';
import { AnalyticsService } from './analytics.service';
import { Auth } from 'src/auth/decorators/auth.decorator';

@Controller('analytics')
export class AnalyticsController {
  constructor(private readonly analyticsService: AnalyticsService) {}

  @HttpCode(200)
  @Auth()
  @Get()
  async getGeneralStatistics() {
    return this.analyticsService.getGeneralStatistics();
  }

  @HttpCode(200)
  @Auth()
  @Get(':id')
  async getDriverStatistics(@Param('id') driverId: string) {
    return this.analyticsService.getDriverStatistics(driverId);
  }
}
