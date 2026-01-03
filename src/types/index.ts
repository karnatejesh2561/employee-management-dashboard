export interface Employee {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  department: string;
  position: string;
  joinDate: string;
  salary: number;
  status: "Active" | "Inactive";
}
