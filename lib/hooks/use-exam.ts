"use client";

import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import { examService } from "@/lib/api/services/exam.service";

import type {
  SubmitExamInput,
} from "@/types/exam";

export const examKeys = {
  all: ["exams"] as const,

  detail: (id: string) =>
    ["exams", id] as const,
};

export function useExam(id: string) {
  return useQuery({
    queryKey: examKeys.detail(id),
    queryFn: () => examService.getExam(id),
    enabled: Boolean(id),
  });
}

export function useStartExam() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) =>
      examService.startExam(id),

    onSuccess: (_, id) => {
      queryClient.invalidateQueries({
        queryKey: examKeys.detail(id),
      });
    },
  });
}

export function useSaveExamAnswers() {
  return useMutation({
    mutationFn: ({
      id,
      answers,
    }: {
      id: string;
      answers: SubmitExamInput["answers"];
    }) =>
      examService.saveAnswers(id, answers),
  });
}

export function useSubmitExam() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: SubmitExamInput;
    }) =>
      examService.submitExam(id, data),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: examKeys.detail(variables.id),
      });
    },
  });
}