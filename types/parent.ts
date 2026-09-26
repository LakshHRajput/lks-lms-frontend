export type ParentStatus = "active" | "inactive";

export interface Parent {
  id: string;
  userId?: string;

  firstName: string;
  lastName: string;

  email?: string;
  phone: string;

  occupation?: string;
  address?: string;

  studentIds?: string[];

  status: ParentStatus;

  createdAt: string;
  updatedAt: string;
}

export interface CreateParentInput {
  firstName: string;
  lastName: string;

  email?: string;
  phone: string;

  occupation?: string;
  address?: string;

  studentIds?: string[];

  status?: ParentStatus;
}