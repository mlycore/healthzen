import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface VitalsChartProps {
  data: any[];
  dataKey: string;
  dataKey2?: string;
  color: string;
  color2?: string;
}

const VitalsChart: React.FC<VitalsChartProps> = ({ data, dataKey, dataKey2, color, color2 }) => {
  const formatXAxis = (tickItem: string) => {
    return new Date(tickItem).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  return (
    <div className="h-80">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis dataKey="date" tickFormatter={formatXAxis} stroke="#64748b" />
          <YAxis stroke="#64748b" />
          <Tooltip 
            contentStyle={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '0.75rem', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)' }}
            labelStyle={{ color: '#0f172a', fontWeight: 'bold' }}
          />
          <Legend />
          <Line type="monotone" dataKey={dataKey} stroke={color} strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 8 }} name={dataKey.charAt(0).toUpperCase() + dataKey.slice(1)} />
          {dataKey2 && color2 && (
            <Line type="monotone" dataKey={dataKey2} stroke={color2} strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 8 }} name={dataKey2.charAt(0).toUpperCase() + dataKey2.slice(1)} />
          )}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default VitalsChart;