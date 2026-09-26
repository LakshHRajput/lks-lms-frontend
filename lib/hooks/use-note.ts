"use client";

import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import { noteService } from "@/lib/api/services/note.service";

import type {
  CreateNoteInput,
} from "@/types/note";

export function useNotes(
  chapterId?: number
) {
  return useQuery({
    queryKey: [
      "notes",
      chapterId,
    ],

    queryFn: () =>
      noteService.getNotes(
        chapterId
      ),
  });
}

export function useCreateNote() {
  const queryClient =
    useQueryClient();

  return useMutation({
    mutationFn: (
      data: CreateNoteInput
    ) =>
      noteService.createNote(
        data
      ),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["notes"],
      });
    },
  });
}