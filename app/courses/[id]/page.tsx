"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useParams } from "next/navigation";

import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import LoadingState from "@/components/states/loading-state";

import { useCourse } from "@/lib/hooks/use-courses";
import { useSubjects } from "@/lib/hooks/use.subjects";

import type { Subject } from "@/types/subject";

export default function CourseDetailPage() {
  return (
    <DashboardLayout>
      <CourseDetail />
    </DashboardLayout>
  );
}

function CourseDetail() {
  const params = useParams();

  const courseId = Number(params.id);

  const { data: courseData, isLoading: courseLoading } = useCourse(courseId);

  const { data: subjectsData, isLoading: subjectsLoading } =
    useSubjects(courseId);

  if (courseLoading || subjectsLoading) {
    return <LoadingState message="Loading course..." />;
  }

  const course = courseData?.data?.data;

  const subjects: Subject[] = subjectsData?.data?.data ?? [];

  if (!course) {
    return <div>Course not found.</div>;
  }

  return (
    <div>
      <Link
        href="/courses"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft size={16} />
        Back to Courses
      </Link>

      <div className="mt-6 rounded-xl border bg-background p-6">
        <h1 className="text-3xl font-bold">{course.name}</h1>

        {course.description && (
          <p className="mt-3 text-muted-foreground">{course.description}</p>
        )}

        {course.className && (
          <p className="mt-4 text-sm">
            Class: <strong>{course.className}</strong>
          </p>
        )}
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-bold">Subjects</h2>

        {subjects.length === 0 ? (
          <p className="mt-4 text-sm text-muted-foreground">
            No subjects available.
          </p>
        ) : (
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {subjects.map((subject) => (
              <Link
                key={subject.id}
                href={`/subjects/${subject.id}`}
                className="rounded-xl border bg-background p-5 hover:shadow-sm"
              >
                <h3 className="font-semibold">{subject.name}</h3>

                {subject.description && (
                  <p className="mt-2 text-sm text-muted-foreground">
                    {subject.description}
                  </p>
                )}
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
