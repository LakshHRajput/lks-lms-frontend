import apiClient from "../api-client";

import type {
  CreateFeeInput,
  CreateFeePaymentInput,
  Fee,
  FeeFilters,
  FeePayment,
  FeeReceipt,
  StudentFeeSummary,
  UpdateFeeInput,
} from "@/types/fee";

export async function getFees(
  filters?: FeeFilters,
) {
  const response = await apiClient.get<{
    success: boolean;
    message: string;
    data: Fee[];
  }>("/fees", {
    params: filters,
  });

  return response.data;
}

export async function getFee(
  id: string,
) {
  const response = await apiClient.get<{
    success: boolean;
    message: string;
    data: Fee;
  }>(`/fees/${id}`);

  return response.data;
}

export async function createFee(
  data: CreateFeeInput,
) {
  const response = await apiClient.post<{
    success: boolean;
    message: string;
    data: Fee;
  }>("/fees", data);

  return response.data;
}

export async function updateFee(
  id: string,
  data: UpdateFeeInput,
) {
  const response = await apiClient.put<{
    success: boolean;
    message: string;
    data: Fee;
  }>(`/fees/${id}`, data);

  return response.data;
}

export async function deleteFee(
  id: string,
) {
  const response = await apiClient.delete<{
    success: boolean;
    message: string;
    data: Fee;
  }>(`/fees/${id}`);

  return response.data;
}

export async function getStudentFeeSummary(
  studentId: string,
) {
  const response = await apiClient.get<{
    success: boolean;
    message: string;
    data: StudentFeeSummary;
  }>(
    `/fees/student/${studentId}/summary`,
  );

  return response.data;
}

export async function getStudentFees(
  studentId: string,
) {
  const response = await apiClient.get<{
    success: boolean;
    message: string;
    data: Fee[];
  }>(
    `/fees/student/${studentId}`,
  );

  return response.data;
}

export async function createFeePayment(
  data: CreateFeePaymentInput,
) {
  const response = await apiClient.post<{
    success: boolean;
    message: string;
    data: FeePayment;
  }>("/fee-payments", data);

  return response.data;
}

export async function getFeePayments(
  feeId: string,
) {
  const response = await apiClient.get<{
    success: boolean;
    message: string;
    data: FeePayment[];
  }>(
    `/fees/${feeId}/payments`,
  );

  return response.data;
}

export async function getFeeReceipt(
  paymentId: string,
) {
  const response = await apiClient.get<{
    success: boolean;
    message: string;
    data: FeeReceipt;
  }>(
    `/fee-payments/${paymentId}/receipt`,
  );

  return response.data;
}