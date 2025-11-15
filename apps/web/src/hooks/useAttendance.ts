import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/lib/api';
import { AttendanceMethod } from '@/types';

export function useAttendance() {
  const queryClient = useQueryClient();

  // Get today's attendance
  const {
    data: todayAttendance,
    isLoading: isTodayLoading,
    error: todayError,
  } = useQuery({
    queryKey: ['attendance', 'today'],
    queryFn: () => apiClient.getTodayAttendance(),
    enabled: true,
  });

  // Mutation for check-in
  const checkInMutation = useMutation({
    mutationFn: (data: {
      companyId: string;
      method: AttendanceMethod;
      latitude?: number;
      longitude?: number;
    }) =>
      apiClient.checkIn(data.companyId, data.method, data.latitude, data.longitude),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['attendance'] });
    },
  });

  // Mutation for check-out
  const checkOutMutation = useMutation({
    mutationFn: (method: AttendanceMethod) => apiClient.checkOut(method),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['attendance'] });
    },
  });

  // Get attendance records
  const {
    data: records,
    isLoading: isRecordsLoading,
    error: recordsError,
  } = useQuery({
    queryKey: ['attendance', 'records'],
    queryFn: () => apiClient.getAttendanceRecords(),
  });

  return {
    todayAttendance,
    isTodayLoading,
    todayError,
    checkIn: checkInMutation.mutate,
    isCheckingIn: checkInMutation.isPending,
    checkOut: checkOutMutation.mutate,
    isCheckingOut: checkOutMutation.isPending,
    records,
    isRecordsLoading,
    recordsError,
  };
}
