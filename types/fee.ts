export type FeeStatus =
    | "pending"
    | "partial"
    | "paid"
    | "overdue"
    | "cancelled";

export type PaymentMethod =
    | "cash"
    | "upi"
    | "bank_transfer"
    | "card"
    | "online";

export interface Fee {
    id: string;

    studentId: string;
    studentName?: string;
    admissionNumber?: string;

    feeType: string;
    description?: string;

    amount: number;
    paidAmount: number;
    dueAmount: number;

    dueDate: string;

    status: FeeStatus;

    createdAt: string;
    updatedAt: string;
}

export interface CreateFeeInput {
    studentId: string;
    feeType: string;
    description?: string;
    amount: number;
    dueDate: string;
}

export interface UpdateFeeInput {
    feeType?: string;
    description?: string;
    amount?: number;
    dueDate?: string;
    status?: FeeStatus;
}

export interface FeeFilters {
    studentId?: string;
    status?: FeeStatus;
    feeType?: string;
    fromDate?: string;
    toDate?: string;
}

export interface FeePayment {
    id: string;
    feeId: string;

    studentId: string;
    studentName?: string;

    amount: number;
    paymentMethod: PaymentMethod;

    transactionId?: string;
    paymentReference?: string;

    paymentDate: string;

    status: "success" | "pending" | "failed";

    remarks?: string;

    createdAt: string;
    updatedAt: string;
}

export interface CreateFeePaymentInput {
    feeId: string;
    amount: number;
    paymentMethod: PaymentMethod;
    transactionId?: string;
    paymentReference?: string;
    paymentDate: string;
    remarks?: string;
}

export interface StudentFeeSummary {
    totalFees: number;
    totalPaid: number;
    totalPending: number;
    totalOverdue: number;
}

export interface FeeReceipt {
    id: string;
    receiptNumber: string;

    feeId: string;
    studentId: string;

    studentName: string;
    admissionNumber: string;

    amount: number;
    paymentMethod: PaymentMethod;

    transactionId?: string;

    paymentDate: string;

    createdAt: string;
}