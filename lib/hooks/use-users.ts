"use client";

import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import {
  userService,
} from "@/lib/api/services/user.service";

import type {
  UpdateUserInput,
} from "@/types/user";

export const userKeys = {
  all: ["users"] as const,

  detail: (id: string) =>
    ["users", id] as const,
};

export function useUsers() {
  return useQuery({
    queryKey: userKeys.all,

    queryFn: () =>
      userService.getUsers(),
  });
}

export function useUser(id: string) {
  return useQuery({
    queryKey: userKeys.detail(id),

    queryFn: () =>
      userService.getUser(id),

    enabled: Boolean(id),
  });
}

export function useUpdateUser() {
  const queryClient =
    useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: UpdateUserInput;
    }) =>
      userService.updateUser(
        id,
        data
      ),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: userKeys.all,
      });

      queryClient.invalidateQueries({
        queryKey: userKeys.detail(
          variables.id
        ),
      });
    },
  });
}

export function useDeleteUser() {
  const queryClient =
    useQueryClient();

  return useMutation({
    mutationFn: (id: string) =>
      userService.deleteUser(id),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: userKeys.all,
      });
    },
  });
}