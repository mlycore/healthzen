import React from 'react';
import { Vital, Medication } from '../types';
import MetricCard from './MetricCard';
import VitalsChart from './VitalsChart';
import { MedicationIcon } from './icons/HealthIcons';

interface DashboardProps {
  vitals: Vital[];
  medications: Medication[];
}

const EmptyState: React.FC<{ text: string }> = ({ text }) => (
  <div className="text-center p-8 bg-white rounded-xl h-full flex items-center justify-center">
    <p className="text-neutral-500">{text}</p>
  </div>
);

const Dashboard: React.FC<DashboardProps> = ({ vitals, medications }) => {
  // Fix: Provide an explicit type for latestVital to handle cases where the vitals array is empty.
  const latestVital: Partial<Vital> = vitals[0] || {};
  const latestWeightData = vitals.map(v => ({ date: v.date, weight: v.weight })).filter(v => v.weight).reverse();

  const getTodayMedications = () => {
    const today = new Date().toISOString().split('T')[0];
    return medications
      .filter(med => med.date === today)
      .sort((a, b) => a.time.localeCompare(b.time));
  };
  
  const todayMedications = getTodayMedications();

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard title="Blood Pressure" value={latestVital.systolic && latestVital.diastolic ? `${latestVital.systolic}/${latestVital.diastolic}` : 'N/A'} unit="mmHg" />
        <MetricCard title="Heart Rate" value={latestVital.heartRate || 'N/A'} unit="BPM" />
        <MetricCard title="Blood Sugar" value={latestVital.bloodSugar || 'N/A'} unit="mg/dL" />
        <MetricCard title="Weight" value={latestVital.weight || 'N/A'} unit="lbs" />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm">
          <h3 className="text-xl font-semibold text-neutral-700 mb-4">Weight Trend</h3>
          {latestWeightData.length > 1 ? (
            <VitalsChart data={latestWeightData} dataKey="weight" color="#6366f1" />
          ) : (
             <EmptyState text="Log at least two weight entries to see a trend." />
          )}
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h3 className="text-xl font-semibold text-neutral-700 mb-4">Today's Medications</h3>
          {todayMedications.length > 0 ? (
            <ul className="space-y-4">
              {todayMedications.map(med => (
                <li key={med.id} className="flex items-center">
                  <div className="bg-indigo-100 p-2 rounded-full mr-4 text-indigo-600">
                    <MedicationIcon />
                  </div>
                  <div>
                    <p className="font-semibold text-neutral-800">{med.name}</p>
                    <p className="text-sm text-neutral-500">{med.dosage} at {med.time}</p>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <EmptyState text="No medications logged for today." />
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;