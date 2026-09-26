"use client";

import { useMemo, useState } from "react";
import { CalendarDays, Check, Loader2, Save } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { useStudents } from "@/lib/hooks/use-students";
import { useMarkBulkAttendance } from "@/lib/hooks/use-attendance";

import type { AttendanceStatus, BulkAttendanceItem } from "@/types/attendance";

const attendanceStatuses: AttendanceStatus[] = [
  "present",
  "absent",
  "late",
  "leave",
];

export default function AttendancePage() {
  const today = new Date().toISOString().split("T")[0];

  const [date, setDate] = useState(today);
  const [className, setClassName] = useState("6");
  const [section, setSection] = useState("");

  const [attendance, setAttendance] = useState<
    Record<string, AttendanceStatus>
  >({});

  const [remarks, setRemarks] = useState<Record<string, string>>({});

  const { data: studentsResponse, isLoading, isError } = useStudents();

  const markBulkAttendance = useMarkBulkAttendance();

  const students = useMemo(() => {
    const allStudents = studentsResponse?.data ?? [];

    return allStudents.filter((student) => {
      const classMatch = student.className === className;

      const sectionMatch = !section || student.section === section;

      return classMatch && sectionMatch;
    });
  }, [studentsResponse, className, section]);

  const getStatus = (studentId: string): AttendanceStatus => {
    return attendance[studentId] ?? "present";
  };

  const handleStatusChange = (studentId: string, status: AttendanceStatus) => {
    setAttendance((previous) => ({
      ...previous,
      [studentId]: status,
    }));
  };

  const handleRemarkChange = (studentId: string, value: string) => {
    setRemarks((previous) => ({
      ...previous,
      [studentId]: value,
    }));
  };

  const handleMarkAllPresent = () => {
    const updated: Record<string, AttendanceStatus> = {};

    students.forEach((student) => {
      updated[student.id] = "present";
    });

    setAttendance(updated);
  };

  const handleSaveAttendance = async () => {
    const payload: BulkAttendanceItem[] = students.map((student) => ({
      studentId: student.id,
      status: getStatus(student.id),
      remarks: remarks[student.id] || undefined,
    }));

    try {
      await markBulkAttendance.mutateAsync({
        date,
        attendance: payload,
      });

      alert("Attendance saved successfully!");
    } catch (error) {
      console.error("Failed to save attendance:", error);

      alert("Failed to save attendance. Please try again.");
    }
  };

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">Attendance</h1>

        <p className="mt-1 text-sm text-muted-foreground">
          Manage daily student attendance.
        </p>
      </div>

      {/* Filters */}
      <div className="rounded-xl border bg-card p-5">
        <div className="grid gap-4 md:grid-cols-3">
          <div className="space-y-2">
            <Label htmlFor="attendance-date">Date</Label>

            <div className="relative">
              <CalendarDays className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

              <Input
                id="attendance-date"
                type="date"
                value={date}
                onChange={(event) => setDate(event.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="class">Class</Label>

            <select
              id="class"
              value={className}
              onChange={(event) => setClassName(event.target.value)}
              className="h-10 w-full rounded-md border bg-background px-3 text-sm"
            >
              {["6", "7", "8", "9", "10", "11", "12"].map((item) => (
                <option key={item} value={item}>
                  Class {item}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="section">Section</Label>

            <Input
              id="section"
              value={section}
              onChange={(event) => setSection(event.target.value)}
              placeholder="Example: A"
            />
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-muted-foreground">
            Students:{" "}
            <span className="font-medium text-foreground">
              {students.length}
            </span>
          </p>
        </div>

        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={handleMarkAllPresent}
            disabled={students.length === 0}
          >
            <Check className="mr-2 h-4 w-4" />
            Mark All Present
          </Button>

          <Button
            onClick={handleSaveAttendance}
            disabled={students.length === 0 || markBulkAttendance.isPending}
          >
            {markBulkAttendance.isPending ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Save className="mr-2 h-4 w-4" />
            )}

            {markBulkAttendance.isPending ? "Saving..." : "Save Attendance"}
          </Button>
        </div>
      </div>

      {/* Loading */}
      {isLoading && (
        <div className="rounded-xl border p-10 text-center">
          <Loader2 className="mx-auto h-6 w-6 animate-spin" />

          <p className="mt-3 text-sm text-muted-foreground">
            Loading students...
          </p>
        </div>
      )}

      {/* Error */}
      {isError && (
        <div className="rounded-xl border border-destructive/30 bg-destructive/5 p-6 text-center">
          <p className="font-medium">Failed to load students.</p>

          <p className="mt-1 text-sm text-muted-foreground">
            Please check your API connection.
          </p>
        </div>
      )}

      {/* Empty */}
      {!isLoading && !isError && students.length === 0 && (
        <div className="rounded-xl border p-10 text-center">
          <h2 className="font-semibold">No students found</h2>

          <p className="mt-2 text-sm text-muted-foreground">
            No students are available for the selected class and section.
          </p>
        </div>
      )}

      {/* Student Attendance */}
      {!isLoading && !isError && students.length > 0 && (
        <div className="space-y-4">
          {students.map((student) => {
            const currentStatus = getStatus(student.id);

            return (
              <div key={student.id} className="rounded-xl border bg-card p-5">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                  {/* Student */}
                  <div>
                    <h2 className="font-semibold">
                      {student.firstName} {student.lastName}
                    </h2>

                    <p className="text-sm text-muted-foreground">
                      Admission No: {student.admissionNumber}
                    </p>
                  </div>

                  {/* Status */}
                  <div className="flex flex-wrap gap-2">
                    {attendanceStatuses.map((status) => (
                      <Button
                        key={status}
                        type="button"
                        variant={
                          currentStatus === status ? "default" : "outline"
                        }
                        onClick={() => handleStatusChange(student.id, status)}
                        className="capitalize"
                      >
                        {status}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Remarks */}
                <div className="mt-4">
                  <Label htmlFor={`remarks-${student.id}`}>Remarks</Label>

                  <Input
                    id={`remarks-${student.id}`}
                    value={remarks[student.id] ?? ""}
                    onChange={(event) =>
                      handleRemarkChange(student.id, event.target.value)
                    }
                    placeholder="Optional remarks"
                    className="mt-2"
                  />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
