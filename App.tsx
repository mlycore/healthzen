
import React, { useState, useCallback } from 'react';
import { useLocalStorage } from './hooks/useLocalStorage';
import { Vital, Medication, View } from './types';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import Vitals from './components/Vitals';
import MedicationLog from './components/MedicationLog';
import SymptomChecker from './components/SymptomChecker';
import Header from './components/Header';
import Modal from './components/Modal';
import LogVitalsForm from './components/LogVitalsForm';
import LogMedicationForm from './components/LogMedicationForm';
import BottomNav from './components/BottomNav';
import Fab from './components/Fab';
import HealthTips from './components/HealthTips';

const App: React.FC = () => {
  const [view, setView] = useState<View>('dashboard');
  const [vitals, setVitals] = useLocalStorage<Vital[]>('vitals', []);
  const [medications, setMedications] = useLocalStorage<Medication[]>('medications', []);
  const [isVitalsModalOpen, setIsVitalsModalOpen] = useState(false);
  const [isMedsModalOpen, setIsMedsModalOpen] = useState(false);

  const addVital = useCallback((vital: Omit<Vital, 'id' | 'date'>) => {
    const newVital: Vital = {
      ...vital,
      id: new Date().toISOString() + Math.random(),
      date: new Date().toISOString(),
    };
    setVitals(prev => [...prev, newVital].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()));
  }, [setVitals]);

  const addMedication = useCallback((medication: Omit<Medication, 'id'>) => {
    const newMedication: Medication = {
      ...medication,
      id: new Date().toISOString() + Math.random(),
    };
    setMedications(prev => [...prev, newMedication].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()));
  }, [setMedications]);

  const renderView = () => {
    switch (view) {
      case 'dashboard':
        return <Dashboard vitals={vitals} medications={medications} />;
      case 'vitals':
        return <Vitals vitals={vitals} />;
      case 'medications':
        return <MedicationLog medications={medications} />;
      case 'symptom-checker':
        return <SymptomChecker />;
      case 'health-tips':
        return <HealthTips />;
      default:
        return <Dashboard vitals={vitals} medications={medications} />;
    }
  };
  
  const fabAction = () => {
    if (view === 'vitals') setIsVitalsModalOpen(true);
    if (view === 'medications') setIsMedsModalOpen(true);
  };
  
  const showFab = view === 'vitals' || view === 'medications';

  return (
    <div className="flex flex-col md:flex-row h-screen bg-neutral-100 font-sans">
      <Sidebar currentView={view} setView={setView} />
      <div className="flex-1 flex flex-col overflow-hidden relative">
        <Header currentView={view} />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-neutral-100 p-4 md:p-8 pb-24 md:pb-8">
          {renderView()}
        </main>
        {showFab && <Fab onClick={fabAction} />}
      </div>
      <BottomNav currentView={view} setView={setView} />
      
      <Modal isOpen={isVitalsModalOpen} onClose={() => setIsVitalsModalOpen(false)} title="Log New Vitals">
        <LogVitalsForm 
          onAddVital={(vital) => {
            addVital(vital);
            setIsVitalsModalOpen(false);
          }}
          onClose={() => setIsVitalsModalOpen(false)}
        />
      </Modal>

      <Modal isOpen={isMedsModalOpen} onClose={() => setIsMedsModalOpen(false)} title="Log New Medication">
        <LogMedicationForm 
          onAddMedication={(med) => {
            addMedication(med);
            setIsMedsModalOpen(false);
          }}
          onClose={() => setIsMedsModalOpen(false)}
        />
      </Modal>
    </div>
  );
};

export default App;
