"use client";

import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import { chapterService } from "@/lib/api/services/chapter.service";

import type {
  CreateChapterInput,
} from "@/types/chapter";

export function useChapters(
  subjectId?: number
) {
  return useQuery({
    queryKey: [
      "chapters",
      subjectId,
    ],

    queryFn: () =>
      chapterService.getChapters(
        subjectId
      ),
  });
}

export function useCreateChapter() {
  const queryClient =
    useQueryClient();

  return useMutation({
    mutationFn: (
      data: CreateChapterInput
    ) =>
      chapterService.createChapter(
        data
      ),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["chapters"],
      });
    },
  });
}