import React from 'react';
import { Vital } from '../types';
import VitalsChart from './VitalsChart';

interface VitalsProps {
  vitals: Vital[];
}

const Vitals: React.FC<VitalsProps> = ({ vitals }) => {
  const chartData = vitals.slice().reverse(); // recharts expects data to be in ascending order of date

  const bpData = chartData.filter(v => v.systolic && v.diastolic);
  const heartRateData = chartData.filter(v => v.heartRate);
  const bloodSugarData = chartData.filter(v => v.bloodSugar);

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h3 className="text-xl font-semibold text-neutral-700 mb-4">Blood Pressure</h3>
          {bpData.length > 1 ? <VitalsChart data={bpData} dataKey="systolic" dataKey2="diastolic" color="#ef4444" color2="#3b82f6" /> : <p className="text-neutral-500">Not enough data to display chart.</p>}
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h3 className="text-xl font-semibold text-neutral-700 mb-4">Heart Rate</h3>
          {heartRateData.length > 1 ? <VitalsChart data={heartRateData} dataKey="heartRate" color="#f97316" /> : <p className="text-neutral-500">Not enough data to display chart.</p>}
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm lg:col-span-2">
          <h3 className="text-xl font-semibold text-neutral-700 mb-4">Blood Sugar</h3>
          {bloodSugarData.length > 1 ? <VitalsChart data={bloodSugarData} dataKey="bloodSugar" color="#10b981" /> : <p className="text-neutral-500">Not enough data to display chart.</p>}
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm">
        <h3 className="text-xl font-semibold text-neutral-700 mb-4">Vitals History</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="border-b bg-neutral-50 text-sm text-neutral-600">
              <tr>
                <th className="p-3 font-semibold">Date</th>
                <th className="p-3 font-semibold">Blood Pressure</th>
                <th className="p-3 font-semibold">Heart Rate</th>
                <th className="p-3 font-semibold">Blood Sugar</th>
                <th className="p-3 font-semibold">Weight</th>
              </tr>
            </thead>
            <tbody>
              {vitals.map(v => (
                <tr key={v.id} className="border-b hover:bg-neutral-50">
                  <td className="p-3">{new Date(v.date).toLocaleString()}</td>
                  <td className="p-3">{v.systolic && v.diastolic ? `${v.systolic}/${v.diastolic}` : 'N/A'}</td>
                  <td className="p-3">{v.heartRate || 'N/A'}</td>
                  <td className="p-3">{v.bloodSugar || 'N/A'}</td>
                  <td className="p-3">{v.weight || 'N/A'}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {vitals.length === 0 && <p className="text-center text-neutral-500 p-8">No vitals logged yet.</p>}
        </div>
      </div>
    </div>
  );
};

export default Vitals;