import apiClient from "../api-client";

import type { ApiResponse } from "@/types/api";

import type {
  Note,
  CreateNoteInput,
} from "@/types/note";

export const noteService = {
  // Get all notes
  getNotes: async (chapterId?: number) => {
    const response = await apiClient.get<
      ApiResponse<Note[]>
    >(
      "/notes",
      chapterId
        ? {
          params: {
            chapterId,
          },
        }
        : undefined
    );

    return response.data;
  },

  // Get single note
  getNoteById: async (id: number) => {
    return apiClient.get<ApiResponse<Note>>(
      `/notes/${id}`
    );
  },

  // Create note
  createNote: async (
    data: CreateNoteInput
  ) => {
    return apiClient.post<
      ApiResponse<Note>,
      CreateNoteInput
    >("/notes", data);
  },

  // Update note
  updateNote: async (
    id: number,
    data: Partial<CreateNoteInput>
  ) => {
    return apiClient.put<
      ApiResponse<Note>,
      Partial<CreateNoteInput>
    >(`/notes/${id}`, data);
  },

  // Delete note
  deleteNote: async (id: number) => {
    return apiClient.delete<ApiResponse<null>>(
      `/notes/${id}`
    );
  },
};