import { IsString, IsOptional, IsNumber, IsUUID } from 'class-validator';
import { AttendanceMethod } from '../entities/attendance.entity';

export class CheckInDto {
  @IsUUID()
  companyId: string;

  @IsString()
  method: AttendanceMethod;

  @IsOptional()
  @IsNumber()
  latitude?: number;

  @IsOptional()
  @IsNumber()
  longitude?: number;

  @IsOptional()
  @IsString()
  notes?: string;
}
