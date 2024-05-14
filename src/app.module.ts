import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { DriverModule } from './driver/driver.module';
import { TransportModule } from './transport/transport.module';
import { TripModule } from './trip/trip.module';
import { ExpenseModule } from './expense/expense.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    AuthModule,
    UserModule,
    DriverModule,
    TransportModule,
    TripModule,
    ExpenseModule,
  ],
})
export class AppModule {}
