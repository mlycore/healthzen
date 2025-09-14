
import React from 'react';
import { View } from './types';
import { DashboardIcon, VitalsIcon, MedicationIcon, SymptomCheckerIcon, HealthTipsIcon } from './components/icons/HealthIcons';

interface NavItem {
  id: View;
  label: string;
  icon: React.ElementType;
}

export const NAV_ITEMS: NavItem[] = [
  { id: 'dashboard', label: 'Dashboard', icon: DashboardIcon },
  { id: 'vitals', label: 'Vitals', icon: VitalsIcon },
  { id: 'medications', label: 'Medications', icon: MedicationIcon },
  { id: 'symptom-checker', label: 'Symptom Checker', icon: SymptomCheckerIcon },
  { id: 'health-tips', label: 'Health Tips', icon: HealthTipsIcon },
];

export const VIEW_TITLES: Record<View, string> = {
  dashboard: 'Health Dashboard',
  vitals: 'Vitals History',
  medications: 'Medication Log',
  'symptom-checker': 'AI Symptom Checker',
  'health-tips': 'Daily Health Tip',
};
