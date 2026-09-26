"use client";

import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import { testService } from "@/lib/api/services/test.service";

import type {
  CreateTestInput,
  UpdateTestInput,
} from "@/types/test";

export const testKeys = {
  all: ["tests"] as const,

  detail: (id: string) =>
    ["tests", id] as const,
};

export function useTests() {
  return useQuery({
    queryKey: testKeys.all,

    queryFn: async () => {
      const response = await testService.getTests();

      return response.data;
    },
  });
}

export function useTest(id: string) {
  return useQuery({
    queryKey: testKeys.detail(id),

    queryFn: async () => {
      const response = await testService.getTest(id);

      return response.data;
    },

    enabled: Boolean(id),
  });
}

export function useCreateTest() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateTestInput) =>
      testService.createTest(data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: testKeys.all,
      });
    },
  });
}

export function useUpdateTest() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: UpdateTestInput;
    }) => testService.updateTest(id, data),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: testKeys.all,
      });

      queryClient.invalidateQueries({
        queryKey: testKeys.detail(variables.id),
      });
    },
  });
}

export function useDeleteTest() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) =>
      testService.deleteTest(id),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: testKeys.all,
      });
    },
  });
}