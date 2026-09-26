import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import {
  createFee,
  createFeePayment,
  deleteFee,
  getFee,
  getFeePayments,
  getFeeReceipt,
  getFees,
  getStudentFeeSummary,
  getStudentFees,
  updateFee,
} from "@/lib/api/services/fee.service";

import type {
  CreateFeeInput,
  CreateFeePaymentInput,
  FeeFilters,
  UpdateFeeInput,
} from "@/types/fee";

export const feeKeys = {
  all: ["fees"] as const,

  list: (filters?: FeeFilters) =>
    ["fees", "list", filters] as const,

  detail: (id: string) =>
    ["fees", id] as const,

  student: (studentId: string) =>
    ["fees", "student", studentId] as const,

  summary: (studentId: string) =>
    ["fees", "summary", studentId] as const,

  payments: (feeId: string) =>
    ["fees", "payments", feeId] as const,

  receipt: (paymentId: string) =>
    ["fees", "receipt", paymentId] as const,
};

export function useFees(
  filters?: FeeFilters,
) {
  return useQuery({
    queryKey: feeKeys.list(filters),

    queryFn: () =>
      getFees(filters),

    enabled: true,
  });
}

export function useFee(id: string) {
  return useQuery({
    queryKey: feeKeys.detail(id),

    queryFn: () =>
      getFee(id),

    enabled: Boolean(id),
  });
}

export function useCreateFee() {
  const queryClient =
    useQueryClient();

  return useMutation({
    mutationFn: (
      data: CreateFeeInput,
    ) =>
      createFee(data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: feeKeys.all,
      });
    },
  });
}

export function useUpdateFee() {
  const queryClient =
    useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: UpdateFeeInput;
    }) =>
      updateFee(id, data),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: feeKeys.all,
      });

      queryClient.invalidateQueries({
        queryKey: feeKeys.detail(
          variables.id,
        ),
      });
    },
  });
}

export function useDeleteFee() {
  const queryClient =
    useQueryClient();

  return useMutation({
    mutationFn: (id: string) =>
      deleteFee(id),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: feeKeys.all,
      });
    },
  });
}

export function useStudentFees(
  studentId: string,
) {
  return useQuery({
    queryKey:
      feeKeys.student(studentId),

    queryFn: () =>
      getStudentFees(studentId),

    enabled: Boolean(studentId),
  });
}

export function useStudentFeeSummary(
  studentId: string,
) {
  return useQuery({
    queryKey:
      feeKeys.summary(studentId),

    queryFn: () =>
      getStudentFeeSummary(studentId),

    enabled: Boolean(studentId),
  });
}

export function useCreateFeePayment() {
  const queryClient =
    useQueryClient();

  return useMutation({
    mutationFn: (
      data: CreateFeePaymentInput,
    ) =>
      createFeePayment(data),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: feeKeys.all,
      });

      queryClient.invalidateQueries({
        queryKey: feeKeys.payments(
          variables.feeId,
        ),
      });
    },
  });
}

export function useFeePayments(
  feeId: string,
) {
  return useQuery({
    queryKey:
      feeKeys.payments(feeId),

    queryFn: () =>
      getFeePayments(feeId),

    enabled: Boolean(feeId),
  });
}

export function useFeeReceipt(
  paymentId: string,
) {
  return useQuery({
    queryKey:
      feeKeys.receipt(paymentId),

    queryFn: () =>
      getFeeReceipt(paymentId),

    enabled: Boolean(paymentId),
  });
}