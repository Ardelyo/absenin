import { create } from 'zustand';
import { AttendanceRecord } from '@/types';

interface AttendanceStore {
  records: AttendanceRecord[];
  selectedMonth: number;
  selectedYear: number;

  setRecords: (records: AttendanceRecord[]) => void;
  setSelectedMonth: (month: number) => void;
  setSelectedYear: (year: number) => void;
  addRecord: (record: AttendanceRecord) => void;
  reset: () => void;
}

const currentDate = new Date();

export const useAttendanceStore = create<AttendanceStore>((set) => ({
  records: [],
  selectedMonth: currentDate.getMonth() + 1,
  selectedYear: currentDate.getFullYear(),

  setRecords: (records) => set({ records }),
  setSelectedMonth: (month) => set({ selectedMonth: month }),
  setSelectedYear: (year) => set({ selectedYear: year }),
  addRecord: (record) =>
    set((state) => ({
      records: [record, ...state.records],
    })),
  reset: () => set({ records: [], selectedMonth: currentDate.getMonth() + 1 }),
}));
