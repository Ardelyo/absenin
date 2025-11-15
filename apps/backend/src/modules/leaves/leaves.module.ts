import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Leave } from './entities/leave.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Leave])],
})
export class LeavesModule {}
