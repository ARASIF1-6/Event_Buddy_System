import { Injectable, NotFoundException, ForbiddenException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, MoreThan, LessThanOrEqual } from 'typeorm';
import { Event } from './event.entity';
import { CreateEventDto } from './create-event.dto';
import { UpdateEventDto } from './update-event.dto';

@Injectable()
export class EventsService {
  constructor(
    @InjectRepository(Event)
    private eventsRepository: Repository<Event>,
  ) {}

  async findUpcoming(): Promise<Event[]> {
    return this.eventsRepository.find({
      where: { event_date: MoreThan(new Date()) },
      order: { event_date: 'ASC' },
    });
  }

  async findPrevious(): Promise<Event[]> {
    return this.eventsRepository.find({
      where: { event_date: LessThanOrEqual(new Date()) },
      order: { event_date: 'DESC' },
    });
  }

  async findOne(id: number): Promise<Event> {
    const event = await this.eventsRepository.findOne({ where: { id } });
    if (!event) {
      throw new NotFoundException('Event not found');
    }
    return event;
  }

  async findAll(): Promise<Event[]> {
    return this.eventsRepository.find();
  }

  async create(createEventDto: CreateEventDto, user: any): Promise<Event> {
    if (user.role !== 'admin') {
      throw new ForbiddenException('Only admins can create events');
    }
    const eventDate = new Date(createEventDto.event_date);
    if (isNaN(eventDate.getTime())) {
      throw new BadRequestException('Invalid event date format');
    }
    if (eventDate <= new Date()) {
      throw new BadRequestException('Event date must be in the future');
    }
    const event = this.eventsRepository.create({
      ...createEventDto,
      event_date: eventDate,
    });
    return this.eventsRepository.save(event);
  }

  async update(id: number, updateEventDto: UpdateEventDto, user: any): Promise<Event> {
    if (user.role !== 'admin') {
      throw new ForbiddenException('Only admins can update events');
    }
    const event = await this.findOne(id);
    if (updateEventDto.event_date) {
      const eventDate = new Date(updateEventDto.event_date);
      if (isNaN(eventDate.getTime())) {
        throw new BadRequestException('Invalid event date format');
      }
      if (eventDate <= new Date()) {
        throw new BadRequestException('Event date must be in the future');
      }
      event.event_date = eventDate;
    }
    if (updateEventDto.total_capacity !== undefined) {
      if (updateEventDto.total_capacity < event.booked_seats) {
        throw new BadRequestException('Total capacity cannot be less than booked seats');
      }
      event.total_capacity = updateEventDto.total_capacity;
    }
    if (updateEventDto.name) {
      event.name = updateEventDto.name;
    }
    if (updateEventDto.description !== undefined) {
      event.description = updateEventDto.description;
    }
    return this.eventsRepository.save(event);
  }

  async remove(id: number, user: any): Promise<void> {
    if (user.role !== 'admin') {
      throw new ForbiddenException('Only admins can delete events');
    }
    const event = await this.findOne(id);
    await this.eventsRepository.remove(event);
  }
}