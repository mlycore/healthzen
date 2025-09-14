import React from 'react';
import { Medication } from '../types';
import { MedicationIcon as PillIcon } from './icons/HealthIcons';

interface MedicationLogProps {
  medications: Medication[];
}

const MedicationLog: React.FC<MedicationLogProps> = ({ medications }) => {
  const groupedMedications = medications.reduce((acc, med) => {
    const date = new Date(med.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(med);
    // Sort medications by time within each day
    acc[date].sort((a,b) => a.time.localeCompare(b.time));
    return acc;
  }, {} as Record<string, Medication[]>);

  const sortedDates = Object.keys(groupedMedications).sort((a,b) => new Date(b).getTime() - new Date(a).getTime());
  
  return (
    <div className="space-y-8">
      <div className="bg-white p-6 rounded-xl shadow-sm">
         <h3 className="text-xl font-semibold text-neutral-700 mb-6">Medication History</h3>
        {medications.length === 0 ? (
           <p className="text-center text-neutral-500 p-8">No medications logged yet.</p>
        ) : (
          <div className="space-y-8">
            {sortedDates.map(date => (
              <div key={date}>
                <h4 className="font-semibold text-neutral-600 pb-2 border-b mb-4">{date}</h4>
                <ul className="space-y-3">
                  {groupedMedications[date].map(med => (
                     <li key={med.id} className="flex items-center justify-between p-3 rounded-lg bg-neutral-50">
                        <div className="flex items-center">
                            <div className="bg-indigo-100 p-2 rounded-full mr-4 text-indigo-600">
                                <PillIcon />
                            </div>
                            <div>
                                <p className="font-semibold text-neutral-800">{med.name}</p>
                                <p className="text-sm text-neutral-500">{med.dosage}</p>
                            </div>
                        </div>
                        <p className="font-mono text-neutral-700 bg-neutral-200 px-3 py-1 rounded-md">{med.time}</p>
                     </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MedicationLog;