import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Event } from '../Events/event.entity';
import { CreateBookingDto } from './booking.dto';
import { Booking } from './booking.entity';

@Injectable()
export class BookingsService {
  constructor(
    @InjectRepository(Booking)
    private bookingsRepository: Repository<Booking>,
    @InjectRepository(Event)
    private eventsRepository: Repository<Event>,
  ) {}

  async create(createBookingDto: CreateBookingDto, userId: number): Promise<Booking> {
    const { eventId, seats } = createBookingDto;

    // Validate event
    const event = await this.eventsRepository.findOne({ where: { id: eventId } });
    if (!event) {
      throw new NotFoundException('Event not found');
    }

    // Check if event is in the future
    if (event.event_date <= new Date()) {
      throw new BadRequestException('Cannot book seats for past events');
    }

    // Check seat availability
    if (event.booked_seats + seats > event.total_capacity) {
      throw new BadRequestException('Not enough seats available');
    }

    // Check max seats per booking
    if (seats > 4) {
      throw new BadRequestException('Cannot book more than 4 seats');
    }

    // Check if user already booked this event
    const existingBooking = await this.bookingsRepository.findOne({
      where: { user_id: userId, event_id: eventId },
    });
    if (existingBooking) {
      throw new BadRequestException('User already booked this event');
    }

    // Update event booked seats
    event.booked_seats += seats;
    await this.eventsRepository.save(event);

    // Create booking
    const booking = this.bookingsRepository.create({
      user_id: userId,
      event_id: eventId,
      seats_booked: seats,
    });
    return this.bookingsRepository.save(booking);
  }

  async findUserBookings(userId: number): Promise<Booking[]> {
    return this.bookingsRepository.find({
      where: { user_id: userId },
      relations: ['event'],
    });
  }
}