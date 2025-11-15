import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  Index,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Company } from '../../companies/entities/company.entity';

export enum AttendanceMethod {
  FACE_RECOGNITION = 'face_recognition',
  QR_CODE = 'qr_code',
  NFC = 'nfc',
  GEOLOCATION = 'geolocation',
  PIN = 'pin',
  BIOMETRIC = 'biometric',
  VOICE = 'voice',
  MANUAL = 'manual',
}

export enum AttendanceStatus {
  PRESENT = 'present',
  LATE = 'late',
  ABSENT = 'absent',
  APPROVED_ABSENCE = 'approved_absence',
}

@Entity('attendances')
@Index(['userId', 'date'])
export class Attendance {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  userId: string;

  @Column()
  companyId: string;

  @Column({ type: 'date' })
  date: Date;

  @Column({ type: 'time' })
  checkInTime: string;

  @Column({ type: 'time', nullable: true })
  checkOutTime: string;

  @Column({
    type: 'enum',
    enum: AttendanceMethod,
  })
  checkInMethod: AttendanceMethod;

  @Column({
    type: 'enum',
    enum: AttendanceMethod,
    nullable: true,
  })
  checkOutMethod: AttendanceMethod;

  @Column({
    type: 'enum',
    enum: AttendanceStatus,
    default: AttendanceStatus.PRESENT,
  })
  status: AttendanceStatus;

  @Column({ nullable: true })
  latitude: number;

  @Column({ nullable: true })
  longitude: number;

  @Column({ nullable: true })
  notes: string;

  @Column({ nullable: true })
  approvedBy: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // Relations
  @ManyToOne(() => User, (user) => user.attendances, { onDelete: 'CASCADE' })
  user: User;

  @ManyToOne(() => Company, (company) => company.attendances, { onDelete: 'CASCADE' })
  company: Company;
}
