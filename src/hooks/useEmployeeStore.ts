import { useEmployeeContext } from '../context/EmployeeContext';

export const useEmployeeStore = () => {
  return useEmployeeContext();
};
