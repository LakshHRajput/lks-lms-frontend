export type VideoProvider =
  | "youtube"
  | "vimeo"
  | "self_hosted";

export interface Video {
  id: number;
  chapterId: number;
  title: string;
  description?: string;
  videoUrl: string;
  thumbnail?: string;
  provider: VideoProvider;
  duration?: number;
  status: "active" | "inactive";
  createdAt: string;
  updatedAt: string;
}

export interface CreateVideoInput {
  chapterId: number;
  title: string;
  description?: string;
  videoUrl: string;
  thumbnail?: string;
  provider: VideoProvider;
  duration?: number;
  status?: "active" | "inactive";
}