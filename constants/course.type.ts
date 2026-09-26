export const COURSE_TYPES = {
  ACADEMIC: "academic",
  DIGITAL_MARKETING: "digital_marketing",
  PROGRAMMING: "programming",
  WEB_DEVELOPMENT: "web_development",
  OTHER: "other",
} as const;

export type CourseType =
  (typeof COURSE_TYPES)[keyof typeof COURSE_TYPES];