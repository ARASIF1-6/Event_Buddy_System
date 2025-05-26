import { Module } from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { BookingsController } from './bookings.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Booking } from './booking.entity';
import { Event } from '../Events/event.entity';
import { AuthModule } from '../Auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Booking, Event]), AuthModule],
  controllers: [BookingsController],
  providers: [BookingsService],
})
export class BookingsModule {}