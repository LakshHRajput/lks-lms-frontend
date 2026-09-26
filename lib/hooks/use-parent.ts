"use client";

import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import {
  parentService,
} from "@/lib/api/services/parent.service";

import type {
  CreateParentInput,
} from "@/types/parent";

export const parentKeys = {
  all: ["parents"] as const,

  detail: (id: string) =>
    ["parents", id] as const,
};

export function useParents() {
  return useQuery({
    queryKey: parentKeys.all,

    queryFn: () =>
      parentService.getParents(),
  });
}

export function useParent(id: string) {
  return useQuery({
    queryKey: parentKeys.detail(id),

    queryFn: () =>
      parentService.getParent(id),

    enabled: Boolean(id),
  });
}

export function useCreateParent() {
  const queryClient =
    useQueryClient();

  return useMutation({
    mutationFn: (
      data: CreateParentInput
    ) =>
      parentService.createParent(data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: parentKeys.all,
      });
    },
  });
}

export function useUpdateParent() {
  const queryClient =
    useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: Partial<CreateParentInput>;
    }) =>
      parentService.updateParent(
        id,
        data
      ),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: parentKeys.all,
      });

      queryClient.invalidateQueries({
        queryKey: parentKeys.detail(
          variables.id
        ),
      });
    },
  });
}

export function useMapStudents() {
  const queryClient =
    useQueryClient();

  return useMutation({
    mutationFn: ({
      parentId,
      studentIds,
    }: {
      parentId: string;
      studentIds: string[];
    }) =>
      parentService.mapStudents(
        parentId,
        studentIds
      ),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: parentKeys.all,
      });

      queryClient.invalidateQueries({
        queryKey: parentKeys.detail(
          variables.parentId
        ),
      });
    },
  });
}

export function useDeleteParent() {
  const queryClient =
    useQueryClient();

  return useMutation({
    mutationFn: (id: string) =>
      parentService.deleteParent(id),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: parentKeys.all,
      });
    },
  });
}