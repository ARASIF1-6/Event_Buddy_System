import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './Auth/auth.module';
import { EventsModule } from './Events/events.module';
import { BookingsModule } from './Bookings/bookings.module';
import { User } from './Auth/users.entity';
import { Event } from './Events/event.entity';
import { Booking } from './Bookings/booking.entity';

@Module({
  imports: [TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'your_username',
      password: 'your_password',
      database: 'eventbuddy_db',
      entities: [User, Event, Booking],
      synchronize: true,
    }),
    AuthModule,
    EventsModule,
    BookingsModule,],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
