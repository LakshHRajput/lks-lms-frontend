"use client";

import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import { questionService } from "@/lib/api/services/question.service";

import type {
  CreateQuestionInput,
  UpdateQuestionInput,
} from "@/types/question";

export const questionKeys = {
  all: ["questions"] as const,

  byTest: (testId: string) =>
    ["questions", "test", testId] as const,

  detail: (id: string) =>
    ["questions", id] as const,
};

export function useQuestions(testId: string) {
  return useQuery({
    queryKey: questionKeys.byTest(testId),

    queryFn: async () => {
      const response =
        await questionService.getQuestions(testId);

      return response.data;
    },

    enabled: Boolean(testId),
  });
}

export function useQuestion(id: string) {
  return useQuery({
    queryKey: questionKeys.detail(id),

    queryFn: async () => {
      const response =
        await questionService.getQuestion(id);

      return response.data;
    },

    enabled: Boolean(id),
  });
}

export function useCreateQuestion() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (
      data: CreateQuestionInput
    ) => questionService.createQuestion(data),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: questionKeys.byTest(
          variables.testId
        ),
      });
    },
  });
}

export function useUpdateQuestion() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: UpdateQuestionInput;
    }) =>
      questionService.updateQuestion(id, data),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: questionKeys.all,
      });

      queryClient.invalidateQueries({
        queryKey: questionKeys.detail(
          variables.id
        ),
      });
    },
  });
}

export function useDeleteQuestion() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) =>
      questionService.deleteQuestion(id),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: questionKeys.all,
      });
    },
  });
}