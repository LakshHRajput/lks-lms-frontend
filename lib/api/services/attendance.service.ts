import apiClient from "../api-client";

import type {
    Attendance,
    AttendanceSummary,
    BulkAttendanceInput,
    CreateAttendanceInput,
    MonthlyAttendance,
    UpdateAttendanceInput,
} from "@/types/attendance";

/*
 * Get all attendance records.
 *
 * Optional filters:
 * - studentId
 * - date
 * - className
 * - section
 */
export interface AttendanceFilters {
    studentId?: string;

    date?: string;

    className?: string;

    section?: string;
}

/*
 * Get attendance list.
 */
export async function getAttendance(
    filters?: AttendanceFilters,
) {
    const response = await apiClient.get<{
        success: boolean;
        message: string;
        data: Attendance[];
    }>("/attendance", {
        params: filters,
    });

    return response.data;
}

/*
 * Get single attendance record.
 */
export async function getAttendanceById(
    id: string,
) {
    const response = await apiClient.get<{
        success: boolean;
        message: string;
        data: Attendance;
    }>(`/attendance/${id}`);

    return response.data;
}

/*
 * Create attendance.
 */
export async function createAttendance(
    data: CreateAttendanceInput,
) {
    const response = await apiClient.post<{
        success: boolean;
        message: string;
        data: Attendance;
    }>("/attendance", data);

    return response.data;
}

/*
 * Update attendance.
 */
export async function updateAttendance(
    id: string,
    data: UpdateAttendanceInput,
) {
    const response = await apiClient.patch<{
        success: boolean;
        message: string;
        data: Attendance;
    }>(`/attendance/${id}`, data);

    return response.data;
}

/*
 * Delete attendance.
 */
export async function deleteAttendance(
    id: string,
) {
    const response = await apiClient.delete<{
        success: boolean;
        message: string;
        data: Attendance;
    }>(`/attendance/${id}`);

    return response.data;
}

/*
 * Mark attendance for multiple students
 * on the same date.
 */
export async function markBulkAttendance(
    data: BulkAttendanceInput,
) {
    const response = await apiClient.post<{
        success: boolean;
        message: string;
        data: Attendance[];
    }>("/attendance/bulk", data);

    return response.data;
}

/*
 * Get attendance summary for a student.
 */
export async function getAttendanceSummary(
    studentId: string,
) {
    const response = await apiClient.get<{
        success: boolean;
        message: string;
        data: AttendanceSummary;
    }>(
        `/attendance/student/${studentId}/summary`,
    );

    return response.data;
}

/*
 * Get monthly attendance for a student.
 */
export async function getMonthlyAttendance(
    studentId: string,
) {
    const response = await apiClient.get<{
        success: boolean;
        message: string;
        data: MonthlyAttendance[];
    }>(
        `/attendance/student/${studentId}/monthly`,
    );

    return response.data;
}