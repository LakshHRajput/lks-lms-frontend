import {
    useMutation,
    useQuery,
    useQueryClient,
} from "@tanstack/react-query";

import {
    createAttendance,
    deleteAttendance,
    getAttendance,
    getAttendanceById,
    getAttendanceSummary,
    getMonthlyAttendance,
    markBulkAttendance,
    updateAttendance,
} from "@/lib/api/services/attendance.service";

import type {
    BulkAttendanceInput,
    CreateAttendanceInput,
    UpdateAttendanceInput,
} from "@/types/attendance";

import type { AttendanceFilters } from "@/lib/api/services/attendance.service";

/*
 * Query keys
 */
export const attendanceKeys = {
    all: ["attendance"] as const,

    list: (filters?: AttendanceFilters) =>
        ["attendance", "list", filters] as const,

    detail: (id: string) =>
        ["attendance", id] as const,

    summary: (studentId: string) =>
        ["attendance", "summary", studentId] as const,

    monthly: (studentId: string) =>
        ["attendance", "monthly", studentId] as const,
};

/*
 * Get attendance list.
 */
export function useAttendance(
    filters?: AttendanceFilters,
) {
    return useQuery({
        queryKey: attendanceKeys.list(filters),

        queryFn: () =>
            getAttendance(filters),

        enabled: true,
    });
}

/*
 * Get single attendance record.
 */
export function useAttendanceById(
    id: string,
) {
    return useQuery({
        queryKey: attendanceKeys.detail(id),

        queryFn: () =>
            getAttendanceById(id),

        enabled: Boolean(id),
    });
}

/*
 * Create attendance.
 */
export function useCreateAttendance() {
    const queryClient =
        useQueryClient();

    return useMutation({
        mutationFn: (
            data: CreateAttendanceInput,
        ) =>
            createAttendance(data),

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: attendanceKeys.all,
            });
        },
    });
}

/*
 * Update attendance.
 */
export function useUpdateAttendance() {
    const queryClient =
        useQueryClient();

    return useMutation({
        mutationFn: ({
            id,
            data,
        }: {
            id: string;
            data: UpdateAttendanceInput;
        }) =>
            updateAttendance(id, data),

        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({
                queryKey: attendanceKeys.all,
            });

            queryClient.invalidateQueries({
                queryKey: attendanceKeys.detail(
                    variables.id,
                ),
            });
        },
    });
}

/*
 * Delete attendance.
 */
export function useDeleteAttendance() {
    const queryClient =
        useQueryClient();

    return useMutation({
        mutationFn: (id: string) =>
            deleteAttendance(id),

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: attendanceKeys.all,
            });
        },
    });
}

/*
 * Mark attendance for multiple students.
 */
export function useMarkBulkAttendance() {
    const queryClient =
        useQueryClient();

    return useMutation({
        mutationFn: (
            data: BulkAttendanceInput,
        ) =>
            markBulkAttendance(data),

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: attendanceKeys.all,
            });
        },
    });
}

/*
 * Get student attendance summary.
 */
export function useAttendanceSummary(
    studentId: string,
) {
    return useQuery({
        queryKey:
            attendanceKeys.summary(studentId),

        queryFn: () =>
            getAttendanceSummary(studentId),

        enabled: Boolean(studentId),
    });
}

/*
 * Get monthly attendance.
 */
export function useMonthlyAttendance(
    studentId: string,
) {
    return useQuery({
        queryKey:
            attendanceKeys.monthly(studentId),

        queryFn: () =>
            getMonthlyAttendance(studentId),

        enabled: Boolean(studentId),
    });
}