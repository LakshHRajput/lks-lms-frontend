"use client";

import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import { subjectService } from "@/lib/api/services/subject.service";

import type {
  CreateSubjectInput,
} from "@/types/subject";

export function useSubjects(
  courseId?: number
) {
  return useQuery({
    queryKey: [
      "subjects",
      courseId,
    ],

    queryFn: () =>
      subjectService.getSubjects(
        courseId
      ),
  });
}

export function useCreateSubject() {
  const queryClient =
    useQueryClient();

  return useMutation({
    mutationFn: (
      data: CreateSubjectInput
    ) =>
      subjectService.createSubject(
        data
      ),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["subjects"],
      });
    },
  });
}