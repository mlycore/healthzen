
export type View = 'dashboard' | 'vitals' | 'medications' | 'symptom-checker' | 'health-tips';

export interface Vital {
  id: string;
  date: string; // ISO string
  systolic?: number;
  diastolic?: number;
  heartRate?: number;
  bloodSugar?: number;
  weight?: number;
}

export interface Medication {
  id: string;
  date: string; // ISO string for the day
  time: string; // e.g., "08:30"
  name: string;
  dosage: string;
}

export interface SymptomAnalysis {
  possibleConditions: {
    name: string;
    description: string;
    severity: 'Low' | 'Medium' | 'High';
  }[];
  recommendations: string[];
  redFlags: string[];
}

export interface HealthTip {
  title: string;
  tip: string;
}
