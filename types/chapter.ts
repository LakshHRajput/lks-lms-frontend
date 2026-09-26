export interface Chapter {
  id: number;
  subjectId: number;
  name: string;
  slug: string;
  description?: string;
  chapterNumber: number;
  status: "active" | "inactive";
  createdAt: string;
  updatedAt: string;
}

export interface CreateChapterInput {
  subjectId: number;
  name: string;
  description?: string;
  chapterNumber: number;
  status?: "active" | "inactive";
}