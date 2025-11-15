import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

// Modules
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { AttendanceModule } from './modules/attendance/attendance.module';
import { LeavesModule } from './modules/leaves/leaves.module';
import { CompaniesModule } from './modules/companies/companies.module';

// Entities
import { User } from './modules/users/entities/user.entity';
import { Attendance } from './modules/attendance/entities/attendance.entity';
import { Leave } from './modules/leaves/entities/leave.entity';
import { Company } from './modules/companies/entities/company.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT) || 5432,
      username: process.env.DB_USER || 'absenin',
      password: process.env.DB_PASSWORD || 'password',
      database: process.env.DB_NAME || 'absenin_db',
      entities: [User, Attendance, Leave, Company],
      synchronize: process.env.NODE_ENV !== 'production',
      logging: process.env.DB_LOGGING === 'true',
    }),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET || 'super-secret-key',
      signOptions: { expiresIn: '24h' },
    }),
    PassportModule,
    AuthModule,
    UsersModule,
    AttendanceModule,
    LeavesModule,
    CompaniesModule,
  ],
})
export class AppModule {}
