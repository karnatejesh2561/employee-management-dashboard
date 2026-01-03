import { useState } from "react";
import { Employee } from "../types";

const STORAGE_KEY = "employees";

const initialEmployees: Employee[] = [
  {
    id: "1",
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@company.com",
    phone: "555-0101",
    department: "Engineering",
    position: "Senior Developer",
    joinDate: "2021-01-15",
    salary: 95000,
    status: "Active",
  },
  {
    id: "2",
    firstName: "Jane",
    lastName: "Smith",
    email: "jane.smith@company.com",
    phone: "555-0102",
    department: "HR",
    position: "HR Manager",
    joinDate: "2020-06-20",
    salary: 75000,
    status: "Active",
  },
  {
    id: "3",
    firstName: "Bob",
    lastName: "Johnson",
    email: "bob.johnson@company.com",
    phone: "555-0103",
    department: "Sales",
    position: "Sales Executive",
    joinDate: "2022-03-10",
    salary: 65000,
    status: "Active",
  },
];

export const useEmployeeStore = () => {
  const [employees, setEmployees] = useState<Employee[]>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : initialEmployees;
  });

  const saveEmployees = (data: Employee[]) => {
    setEmployees(data);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  };

  const addEmployee = (employee: Omit<Employee, "id">) => {
    const newEmployee: Employee = {
      ...employee,
      id: Date.now().toString(),
    };
    saveEmployees([...employees, newEmployee]);
    return newEmployee;
  };

  const updateEmployee = (id: string, employee: Omit<Employee, "id">) => {
    const updated = employees.map((emp) =>
      emp.id === id ? { ...emp, ...employee } : emp
    );
    saveEmployees(updated);
  };

  const deleteEmployee = (id: string) => {
    const filtered = employees.filter((emp) => emp.id !== id);
    saveEmployees(filtered);
  };

  const getEmployee = (id: string) => {
    return employees.find((emp) => emp.id === id);
  };

  const searchEmployees = (query: string) => {
    const lowercaseQuery = query.toLowerCase();
    return employees.filter(
      (emp) =>
        emp.firstName.toLowerCase().includes(lowercaseQuery) ||
        emp.lastName.toLowerCase().includes(lowercaseQuery) ||
        emp.email.toLowerCase().includes(lowercaseQuery) ||
        emp.department.toLowerCase().includes(lowercaseQuery)
    );
  };

  return {
    employees,
    addEmployee,
    updateEmployee,
    deleteEmployee,
    getEmployee,
    searchEmployees,
  };
};
