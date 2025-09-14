import React from 'react';

interface MetricCardProps {
  title: string;
  value: string | number;
  unit: string;
}

const MetricCard: React.FC<MetricCardProps> = ({ title, value, unit }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm">
      <h4 className="text-neutral-500 font-medium">{title}</h4>
      <div className="flex items-baseline mt-2">
        <p className="text-4xl font-bold text-neutral-800">{value}</p>
        {value !== 'N/A' && <span className="ml-2 text-neutral-600">{unit}</span>}
      </div>
    </div>
  );
};

export default MetricCard;