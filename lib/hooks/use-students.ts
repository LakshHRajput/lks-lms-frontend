"use client";

import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import { studentService } from "@/lib/api/services/student.service";

import type { CreateStudentInput } from "@/types/student";

export const studentKeys = {
  all: ["students"] as const,

  detail: (id: string) =>
    ["students", id] as const,
};

export function useStudents() {
  return useQuery({
    queryKey: studentKeys.all,
    queryFn: () => studentService.getStudents(),
  });
}

export function useStudent(id: string) {
  return useQuery({
    queryKey: studentKeys.detail(id),
    queryFn: () => studentService.getStudent(id),
    enabled: Boolean(id),
  });
}

export function useCreateStudent() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateStudentInput) =>
      studentService.createStudent(data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: studentKeys.all,
      });
    },
  });
}

export function useDeleteStudent() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) =>
      studentService.deleteStudent(id),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: studentKeys.all,
      });
    },
  });
}