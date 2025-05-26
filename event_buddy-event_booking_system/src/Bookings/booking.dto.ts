import { IsInt, Min, Max, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateBookingDto {
  @ApiProperty({ example: 1, description: 'ID of the event to book' })
  @IsInt({ message: 'Event ID must be an integer' })
  @IsNotEmpty({ message: 'Event ID is required' })
  eventId: number;

  @ApiProperty({ example: 2, description: 'Number of seats to book (1-4)' })
  @IsInt({ message: 'Seats must be an integer' })
  @Min(1, { message: 'At least 1 seat must be booked' })
  @Max(4, { message: 'Cannot book more than 4 seats' })
  @IsNotEmpty({ message: 'Seats is required' })
  seats: number;
}