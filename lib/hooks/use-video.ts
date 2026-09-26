"use client";

import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import { videoService } from "@/lib/api/services/video.service";

import type {
  CreateVideoInput,
} from "@/types/video";

export function useVideos(
  chapterId?: number
) {
  return useQuery({
    queryKey: [
      "videos",
      chapterId,
    ],

    queryFn: () =>
      videoService.getVideos(
        chapterId
      ),
  });
}

export function useCreateVideo() {
  const queryClient =
    useQueryClient();

  return useMutation({
    mutationFn: (
      data: CreateVideoInput
    ) =>
      videoService.createVideo(
        data
      ),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["videos"],
      });
    },
  });
}