export type AttendanceStatus =
  | "present"
  | "absent"
  | "late"
  | "leave";

export interface Attendance {
  id: string;

  studentId: string;

  /*
   * Optional information returned by backend
   * for easier display in the frontend.
   */
  studentName?: string;
  admissionNumber?: string;

  className?: string;
  section?: string;

  /*
   * Attendance date in YYYY-MM-DD format.
   */
  date: string;

  status: AttendanceStatus;

  /*
   * Optional teacher/admin remark.
   */
  remarks?: string;

  createdAt: string;
  updatedAt: string;
}

export interface CreateAttendanceInput {
  studentId: string;

  date: string;

  status: AttendanceStatus;

  remarks?: string;
}

export interface UpdateAttendanceInput {
  status?: AttendanceStatus;

  remarks?: string;
}

/*
 * Used when marking attendance for
 * multiple students at once.
 */
export interface BulkAttendanceItem {
  studentId: string;

  status: AttendanceStatus;

  remarks?: string;
}

export interface BulkAttendanceInput {
  date: string;

  attendance: BulkAttendanceItem[];
}

/*
 * Attendance summary.
 */
export interface AttendanceSummary {
  totalDays: number;

  presentDays: number;

  absentDays: number;

  lateDays: number;

  leaveDays: number;

  attendancePercentage: number;
}

/*
 * Monthly attendance summary.
 */
export interface MonthlyAttendance {
  month: string;

  year: number;

  totalDays: number;

  presentDays: number;

  absentDays: number;

  lateDays: number;

  leaveDays: number;

  attendancePercentage: number;
}