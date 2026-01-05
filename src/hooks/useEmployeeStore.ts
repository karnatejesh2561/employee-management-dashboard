// src/hooks/useEmployeeStore.ts
import { useState, useCallback } from "react";
import { Employee } from "../types";

const STORAGE_KEY = "employees";
const STORAGE_VERSION = "v1.0.0";
const STORAGE_VERSION_KEY = "employees_version";

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
    status: "Inactive",
  },
];

export const useEmployeeStore = () => {
  const [employees, setEmployees] = useState<Employee[]>(() => {
    try {
      const storedVersion = localStorage.getItem(STORAGE_VERSION_KEY);
      const stored = localStorage.getItem(STORAGE_KEY);

      // Only reset if version changed
      if (storedVersion !== STORAGE_VERSION || !stored) {
        localStorage.setItem(STORAGE_VERSION_KEY, STORAGE_VERSION);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(initialEmployees));
        return initialEmployees;
      }

      const parsed = JSON.parse(stored);
      return Array.isArray(parsed) ? parsed : initialEmployees;
    } catch {
      return initialEmployees;
    }
  });

  const saveEmployees = (data: Employee[]) => {
    setEmployees(data);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  };

  const addEmployee = (employee: Omit<Employee, "id">) => {
    const newEmployee: Employee = { ...employee, id: crypto.randomUUID() };
    saveEmployees([...employees, newEmployee]);
    return newEmployee;
  };

  const updateEmployee = (id: string, updates: Partial<Employee>) => {
    const updated = employees.map((emp) =>
      emp.id === id ? { ...emp, ...updates } : emp
    );
    saveEmployees(updated);
  };

  const deleteEmployee = (id: string) => {
    const filtered = employees.filter((emp) => emp.id !== id);
    setEmployees(filtered); // update state
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered)); // update localStorage
    return filtered; // return updated list immediately if needed
  };

  const getEmployee = useCallback(
    (id: string) => employees.find((emp) => emp.id === id),
    [employees]
  );

  const searchEmployees = useCallback(
    (query: string) => {
      const q = query.toLowerCase();
      return employees.filter(
        (emp) =>
          emp.firstName.toLowerCase().includes(q) ||
          emp.lastName.toLowerCase().includes(q) ||
          emp.email.toLowerCase().includes(q) ||
          emp.department.toLowerCase().includes(q)
      );
    },
    [employees]
  );

  return {
    employees,
    addEmployee,
    updateEmployee,
    deleteEmployee,
    getEmployee,
    searchEmployees,
  };
};
