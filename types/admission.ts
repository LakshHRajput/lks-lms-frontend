export type AdmissionStatus =
    | "pending"
    | "approved"
    | "rejected"
    | "cancelled";

export interface Admission {
    id: string;
    admissionNumber: string;

    studentName: string;
    fatherName?: string;
    motherName?: string;

    dateOfBirth?: string;
    gender?: "male" | "female" | "other";

    phone: string;
    email?: string;

    address?: string;

    className: string;
    section?: string;

    courseId?: string;
    courseName?: string;

    previousSchool?: string;

    admissionDate: string;

    totalFee?: number;
    paidFee?: number;
    pendingFee?: number;

    status: AdmissionStatus;

    createdAt: string;
    updatedAt: string;
}

export interface CreateAdmissionInput {
    studentName: string;
    fatherName?: string;
    motherName?: string;
    dateOfBirth?: string;
    gender?: "male" | "female" | "other";
    phone: string;
    email?: string;
    address?: string;
    className: string;
    section?: string;
    courseId?: string;
    previousSchool?: string;
    admissionDate: string;
    totalFee?: number;
}