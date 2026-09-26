"use client";

import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import { courseService } from "@/lib/api/services/course.service";

import type {
  CreateCourseInput,
} from "@/types/course";

export const courseKeys = {
  all: ["courses"] as const,

  detail: (id: number) =>
    ["courses", id] as const,
};

export function useCourses() {
  return useQuery({
    queryKey: courseKeys.all,
    queryFn: courseService.getCourses,
  });
}

export function useCourse(id: number) {
  return useQuery({
    queryKey: courseKeys.detail(id),
    queryFn: () =>
      courseService.getCourseById(id),
    enabled: Boolean(id),
  });
}

export function useCreateCourse() {
  const queryClient =
    useQueryClient();

  return useMutation({
    mutationFn: (
      data: CreateCourseInput
    ) =>
      courseService.createCourse(data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: courseKeys.all,
      });
    },
  });
}

export function useDeleteCourse() {
  const queryClient =
    useQueryClient();

  return useMutation({
    mutationFn: (
      id: number
    ) =>
      courseService.deleteCourse(id),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: courseKeys.all,
      });
    },
  });
}