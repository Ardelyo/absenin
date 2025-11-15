import { IsString, IsOptional } from 'class-validator';
import { AttendanceMethod } from '../entities/attendance.entity';

export class CheckOutDto {
  @IsString()
  method: AttendanceMethod;

  @IsOptional()
  @IsString()
  notes?: string;
}
