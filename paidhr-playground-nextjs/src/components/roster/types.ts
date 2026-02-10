export interface Employee {
  id: string;
  name: string;
  role: string;
  avatar?: string;
}

export interface Shift {
  id: string;
  date: string; // YYYY-MM-DD
  startTime: string;
  endTime: string;
  role: string;
  location?: string;
  variant?: 'default' | 'blue' | 'purple' | 'orange';
}

export interface RosterData {
  employee: Employee;
  shifts: Shift[];
}
