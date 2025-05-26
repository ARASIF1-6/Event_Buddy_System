import { IsString, IsNotEmpty, IsInt, Min, IsDateString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateEventDto {
  @ApiProperty({ example: 'Concert Night' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'A night of music and fun' })
  @IsString()
  description: string;

  @ApiProperty({ example: '2025-06-01T19:00:00Z' })
  @IsDateString()
  event_date: string;

  @ApiProperty({ example: 100 })
  @IsInt()
  @Min(1)
  total_capacity: number;
}