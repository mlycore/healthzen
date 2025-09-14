import React, { useState } from 'react';
import { Vital } from '../types';

interface LogVitalsFormProps {
  onAddVital: (vital: Omit<Vital, 'id' | 'date'>) => void;
  onClose: () => void;
}

const FormInput: React.FC<{ label: string, type?: string, value: string, onChange: (e: React.ChangeEvent<HTMLInputElement>) => void, step?: string }> = 
({ label, type = "number", value, onChange, step }) => (
    <div>
        <label className="block text-sm font-medium text-neutral-600 mb-1">{label}</label>
        <input 
            type={type} 
            value={value} 
            onChange={onChange}
            step={step}
            className="block w-full border-0 bg-neutral-100 rounded-md shadow-sm p-2 focus:ring-2 focus:ring-indigo-500" />
    </div>
);

const LogVitalsForm: React.FC<LogVitalsFormProps> = ({ onAddVital, onClose }) => {
  const [systolic, setSystolic] = useState('');
  const [diastolic, setDiastolic] = useState('');
  const [heartRate, setHeartRate] = useState('');
  const [bloodSugar, setBloodSugar] = useState('');
  const [weight, setWeight] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddVital({
      systolic: systolic ? parseInt(systolic) : undefined,
      diastolic: diastolic ? parseInt(diastolic) : undefined,
      heartRate: heartRate ? parseInt(heartRate) : undefined,
      bloodSugar: bloodSugar ? parseInt(bloodSugar) : undefined,
      weight: weight ? parseFloat(weight) : undefined,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
            <FormInput label="Systolic (mmHg)" value={systolic} onChange={e => setSystolic(e.target.value)} />
            <FormInput label="Diastolic (mmHg)" value={diastolic} onChange={e => setDiastolic(e.target.value)} />
        </div>
      <FormInput label="Heart Rate (BPM)" value={heartRate} onChange={e => setHeartRate(e.target.value)} />
      <FormInput label="Blood Sugar (mg/dL)" value={bloodSugar} onChange={e => setBloodSugar(e.target.value)} />
      <FormInput label="Weight (lbs)" value={weight} onChange={e => setWeight(e.target.value)} step="0.1" />
      
      <div className="flex justify-end pt-4 space-x-3">
        <button type="button" onClick={onClose} className="px-4 py-2 text-indigo-600 font-semibold rounded-full hover:bg-indigo-50">Cancel</button>
        <button type="submit" className="px-6 py-2 bg-indigo-500 text-white font-semibold rounded-full hover:bg-indigo-600 shadow-sm hover:shadow-md transition-all">Save</button>
      </div>
    </form>
  );
};

export default LogVitalsForm;