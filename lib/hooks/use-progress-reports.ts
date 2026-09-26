"use client";

import {
    useMutation,
    useQuery,
    useQueryClient,
} from "@tanstack/react-query";

import {
    progressReportService,
} from "@/lib/api/services/progress-report.service";

import type {
    GenerateProgressReportInput,
    UpdateProgressReportInput,
} from "@/types/progress-report";

const progressReportKeys = {
    all: ["progress-reports"] as const,

    detail: (id: string) =>
        ["progress-reports", id] as const,

    student: (studentId: string) =>
        ["progress-reports", "student", studentId] as const,

    summary: (studentId: string) =>
        [
            "progress-reports",
            "student",
            studentId,
            "summary",
        ] as const,
};

export function useProgressReports() {
    return useQuery({
        queryKey: progressReportKeys.all,
        queryFn: async () => {
            return progressReportService.getReports();
        },
    });
}

export function useProgressReport(id: string) {
    return useQuery({
        queryKey: progressReportKeys.detail(id),
        queryFn: async () => {
            return progressReportService.getReport(id);
        },
        enabled: Boolean(id),
    });
}

export function useStudentProgressReports(
    studentId: string,
) {
    return useQuery({
        queryKey:
            progressReportKeys.student(studentId),
        queryFn: async () => {
            return progressReportService.getStudentReport(
                studentId,
            );
        },
        enabled: Boolean(studentId),
    });
}

export function useStudentProgressSummary(
    studentId: string,
) {
    return useQuery({
        queryKey:
            progressReportKeys.summary(studentId),
        queryFn: async () => {
            return progressReportService.getStudentSummary(
                studentId,
            );
        },
        enabled: Boolean(studentId),
    });
}

export function useGenerateProgressReport() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (
            data: GenerateProgressReportInput,
        ) =>
            progressReportService.generateReport(data),

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: progressReportKeys.all,
            });
        },
    });
}

export function useUpdateProgressReport() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({
            id,
            data,
        }: {
            id: string;
            data: UpdateProgressReportInput;
        }) =>
            progressReportService.updateReport(
                id,
                data,
            ),

        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({
                queryKey: progressReportKeys.detail(
                    variables.id,
                ),
            });

            queryClient.invalidateQueries({
                queryKey: progressReportKeys.all,
            });
        },
    });
}

export function useDeleteProgressReport() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: string) =>
            progressReportService.deleteReport(id),

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: progressReportKeys.all,
            });
        },
    });
}