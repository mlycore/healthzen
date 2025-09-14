import React, { useState } from 'react';
import { Medication } from '../types';

interface LogMedicationFormProps {
  onAddMedication: (medication: Omit<Medication, 'id'>) => void;
  onClose: () => void;
}

const FormInput: React.FC<{ label: string, type: string, value: string, onChange: (e: React.ChangeEvent<HTMLInputElement>) => void, required?: boolean }> = 
({ label, type, value, onChange, required }) => (
    <div>
        <label className="block text-sm font-medium text-neutral-600 mb-1">{label}</label>
        <input 
            type={type} 
            value={value} 
            onChange={onChange}
            required={required}
            className="block w-full border-0 bg-neutral-100 rounded-md shadow-sm p-2 focus:ring-2 focus:ring-indigo-500" />
    </div>
);

const LogMedicationForm: React.FC<LogMedicationFormProps> = ({ onAddMedication, onClose }) => {
  const [name, setName] = useState('');
  const [dosage, setDosage] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [time, setTime] = useState(new Date().toTimeString().substring(0,5));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !dosage) {
        alert("Please fill in all fields.");
        return;
    }
    onAddMedication({ name, dosage, date, time });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <FormInput label="Medication Name" type="text" value={name} onChange={e => setName(e.target.value)} required />
      <FormInput label="Dosage (e.g., 500mg, 1 tablet)" type="text" value={dosage} onChange={e => setDosage(e.target.value)} required />
      <div className="grid grid-cols-2 gap-4">
        <FormInput label="Date" type="date" value={date} onChange={e => setDate(e.target.value)} required />
        <FormInput label="Time" type="time" value={time} onChange={e => setTime(e.target.value)} required />
      </div>
      <div className="flex justify-end pt-4 space-x-3">
        <button type="button" onClick={onClose} className="px-4 py-2 text-indigo-600 font-semibold rounded-full hover:bg-indigo-50">Cancel</button>
        <button type="submit" className="px-6 py-2 bg-indigo-500 text-white font-semibold rounded-full hover:bg-indigo-600 shadow-sm hover:shadow-md transition-all">Save</button>
      </div>
    </form>
  );
};

export default LogMedicationForm;