"use client";

import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import { teacherService } from "@/lib/api/services/teacher.service";

import type { CreateTeacherInput } from "@/types/teacher";

export const teacherKeys = {
  all: ["teachers"] as const,

  detail: (id: string) =>
    ["teachers", id] as const,
};

export function useTeachers() {
  return useQuery({
    queryKey: teacherKeys.all,
    queryFn: () => teacherService.getTeachers(),
  });
}

export function useTeacher(id: string) {
  return useQuery({
    queryKey: teacherKeys.detail(id),

    queryFn: () =>
      teacherService.getTeacher(id),

    enabled: Boolean(id),
  });
}

export function useCreateTeacher() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateTeacherInput) =>
      teacherService.createTeacher(data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: teacherKeys.all,
      });
    },
  });
}

export function useUpdateTeacher() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: Partial<CreateTeacherInput>;
    }) =>
      teacherService.updateTeacher(id, data),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: teacherKeys.all,
      });

      queryClient.invalidateQueries({
        queryKey: teacherKeys.detail(
          variables.id
        ),
      });
    },
  });
}

export function useDeleteTeacher() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) =>
      teacherService.deleteTeacher(id),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: teacherKeys.all,
      });
    },
  });
}