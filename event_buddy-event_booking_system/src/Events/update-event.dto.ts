import { IsString, IsOptional, IsInt, Min, IsDateString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateEventDto {
  @ApiProperty({ example: 'Concert Night', description: 'Name of the event', required: false })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({ example: 'A night of music and fun', description: 'Description of the event', required: false })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ example: '2025-06-01T19:00:00Z', description: 'Date and time of the event (ISO 8601)', required: false })
  @IsDateString()
  @IsOptional()
  event_date?: string;

  @ApiProperty({ example: 100, description: 'Total capacity of the event (must be >= booked seats)', required: false })
  @IsInt()
  @Min(1, { message: 'Total capacity must be at least 1' })
  @IsOptional()
  total_capacity?: number;
}