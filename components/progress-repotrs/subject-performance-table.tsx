"use client";

import type { SubjectPerformance } from "@/types/progress-report";

interface SubjectPerformanceTableProps {
  subjects: SubjectPerformance[];
}

export function SubjectPerformanceTable({
  subjects,
}: SubjectPerformanceTableProps) {
  return (
    <div className="overflow-x-auto rounded-xl border">
      <table className="w-full min-w-[700px] text-sm">
        <thead className="border-b bg-muted/50">
          <tr>
            <th className="px-4 py-3 text-left">
              Subject
            </th>

            <th className="px-4 py-3 text-center">
              Total
            </th>

            <th className="px-4 py-3 text-center">
              Obtained
            </th>

            <th className="px-4 py-3 text-center">
              Percentage
            </th>

            <th className="px-4 py-3 text-center">
              Grade
            </th>

            <th className="px-4 py-3 text-center">
              Status
            </th>
          </tr>
        </thead>

        <tbody>
          {subjects.map((subject) => (
            <tr
              key={subject.subjectId}
              className="border-b last:border-b-0"
            >
              <td className="px-4 py-4 font-medium">
                {subject.subjectName}
              </td>

              <td className="px-4 py-4 text-center">
                {subject.totalMarks}
              </td>

              <td className="px-4 py-4 text-center">
                {subject.obtainedMarks}
              </td>

              <td className="px-4 py-4 text-center">
                {subject.percentage.toFixed(2)}%
              </td>

              <td className="px-4 py-4 text-center font-semibold">
                {subject.grade}
              </td>

              <td className="px-4 py-4 text-center capitalize">
                {subject.status}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}