export interface Note {
  id: number;
  chapterId: number;
  title: string;
  description?: string;
  fileUrl: string;
  fileType?: string;
  fileSize?: number;
  status: "active" | "inactive";
  createdAt: string;
  updatedAt: string;
}

export interface CreateNoteInput {
  chapterId: number;
  title: string;
  description?: string;
  fileUrl: string;
  fileType?: string;
  fileSize?: number;
  status?: "active" | "inactive";
}