import { Controller, Post, Get, Body, UseGuards, Req, Param, Query } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AttendanceService } from './attendance.service';
import { CheckInDto } from './dto/check-in.dto';
import { CheckOutDto } from './dto/check-out.dto';

@Controller('attendance')
@UseGuards(AuthGuard('jwt'))
export class AttendanceController {
  constructor(private attendanceService: AttendanceService) {}

  @Post('check-in')
  async checkIn(@Req() req, @Body() checkInDto: CheckInDto) {
    return this.attendanceService.checkIn(req.user.id, checkInDto);
  }

  @Post('check-out')
  async checkOut(@Req() req, @Body() checkOutDto: CheckOutDto) {
    return this.attendanceService.checkOut(req.user.id, checkOutDto);
  }

  @Get('today')
  async getTodayAttendance(@Req() req) {
    return this.attendanceService.getTodayAttendance(req.user.id);
  }

  @Get('my-records')
  async getMyAttendanceRecords(
    @Req() req,
    @Query('month') month?: string,
    @Query('year') year?: string,
  ) {
    return this.attendanceService.getAttendanceRecords(req.user.id, month, year);
  }

  @Get(':id')
  async getAttendanceDetail(@Param('id') id: string) {
    return this.attendanceService.getAttendanceDetail(id);
  }
}
