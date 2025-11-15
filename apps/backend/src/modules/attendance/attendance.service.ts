import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Attendance, AttendanceStatus } from './entities/attendance.entity';
import { CheckInDto } from './dto/check-in.dto';
import { CheckOutDto } from './dto/check-out.dto';

@Injectable()
export class AttendanceService {
  constructor(
    @InjectRepository(Attendance)
    private attendanceRepository: Repository<Attendance>,
  ) {}

  async checkIn(userId: string, checkInDto: CheckInDto) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Check if user already checked in today
    const existingAttendance = await this.attendanceRepository.findOne({
      where: {
        userId,
        date: today,
      },
    });

    if (existingAttendance && existingAttendance.checkInTime) {
      throw new BadRequestException('You have already checked in today');
    }

    const now = new Date();
    const checkInTime = now.toTimeString().split(' ')[0]; // HH:MM:SS

    const attendance = this.attendanceRepository.create({
      userId,
      companyId: checkInDto.companyId,
      date: today,
      checkInTime,
      checkInMethod: checkInDto.method,
      latitude: checkInDto.latitude,
      longitude: checkInDto.longitude,
      status: AttendanceStatus.PRESENT, // Can be updated based on time logic
      notes: checkInDto.notes,
    });

    return this.attendanceRepository.save(attendance);
  }

  async checkOut(userId: string, checkOutDto: CheckOutDto) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const attendance = await this.attendanceRepository.findOne({
      where: {
        userId,
        date: today,
      },
    });

    if (!attendance) {
      throw new NotFoundException('No check-in record found for today');
    }

    if (attendance.checkOutTime) {
      throw new BadRequestException('You have already checked out today');
    }

    const now = new Date();
    const checkOutTime = now.toTimeString().split(' ')[0]; // HH:MM:SS

    attendance.checkOutTime = checkOutTime;
    attendance.checkOutMethod = checkOutDto.method;

    return this.attendanceRepository.save(attendance);
  }

  async getTodayAttendance(userId: string) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return this.attendanceRepository.findOne({
      where: {
        userId,
        date: today,
      },
    });
  }

  async getAttendanceRecords(userId: string, month?: string, year?: string) {
    let query = this.attendanceRepository
      .createQueryBuilder('attendance')
      .where('attendance.userId = :userId', { userId })
      .orderBy('attendance.date', 'DESC');

    if (month && year) {
      const startDate = new Date(parseInt(year), parseInt(month) - 1, 1);
      const endDate = new Date(parseInt(year), parseInt(month), 0);
      query = query.andWhere('attendance.date BETWEEN :startDate AND :endDate', {
        startDate,
        endDate,
      });
    }

    return query.getMany();
  }

  async getAttendanceDetail(id: string) {
    const attendance = await this.attendanceRepository.findOne({
      where: { id },
      relations: ['user', 'company'],
    });

    if (!attendance) {
      throw new NotFoundException('Attendance record not found');
    }

    return attendance;
  }
}
