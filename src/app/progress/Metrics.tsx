'use client';
import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';

type DataPoint = {
  date: string;
  average: number;
  metrics: Record<string, number | string>;
};

interface MetricsSectionProps {
  title: string;
  data: DataPoint[];
  metrics: Array<{
    key: string;
    label: string;
    suffix?: string;
  }>;
  color: string;
}

interface CustomDotProps {
  cx: number;
  cy: number;
  index: number;
  stroke: string;
  dataKey?: string;
  payload?: DataPoint;
  value?: number;
}

const MetricsSection: React.FC<MetricsSectionProps> = ({ title, data, metrics, color }) => {
  const [selectedPoint, setSelectedPoint] = useState<DataPoint | null>(null);

  const handleClick = (point: DataPoint) => {
    setSelectedPoint(point === selectedPoint ? null : point);
  };

  const currentMetrics = data[data.length - 1].metrics;

  const renderCustomDot = (props: CustomDotProps) => {
    const { cx, cy, index } = props;

    if (typeof cx !== 'number' || typeof cy !== 'number' || typeof index !== 'number') {
      return <circle cx={0} cy={0} r={0} fill="none" />;
    }

    return (
      <circle
        key={`dot-${index}`}
        cx={cx}
        cy={cy}
        r={selectedPoint?.date === data[index]?.date ? 10 : 8}
        fill={selectedPoint?.date === data[index]?.date ? '#145da0' : color}
        className="cursor-pointer"
        onClick={() => data[index] && handleClick(data[index])}
      />
    );
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
      <div
        className={`flex flex-col justify-around border-2 md:border-4 border-${color}-500 rounded-lg`}
      >
        <h2 className="text-2xl font-semibold text-gray-800">{title}</h2>

        {/* Current Metrics Grid */}
        <div className="grid grid-cols-3 gap-8">
          {metrics.map(({ key, label, suffix }) => (
            <div key={key} className="space-y-1">
              <p className="text-lg font-bold text-gray-900">
                {currentMetrics[key]}
                {suffix}
              </p>
              <p className="text-xs text-gray-600">{label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Selected Point Details */}
      {selectedPoint && (
        <div className="animate-fade-in flex flex-col justify-around relative border-2 md:border-4 border-gray-500 rounded-lg">
          <button
            onClick={() => setSelectedPoint(null)}
            className="absolute top-1 right-1 w-6 h-6 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
            aria-label="Close historical data"
          >
            <span className="text-gray-500 font-medium leading-none select-none" aria-hidden="true">
              ×
            </span>
          </button>
          <h3 className="text-xl font-bold text-gray-900 pr-8">
            Historical ({selectedPoint.date})
          </h3>
          <div className="grid grid-cols-3 gap-8">
            {metrics.map(({ key, label, suffix }) => (
              <div key={key} className="space-y-1">
                <p className="text-lg font-bold text-gray-900">
                  {selectedPoint.metrics[key]}
                  {suffix}
                </p>
                <p className="text-xs text-gray-600">{label}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Progress Graph */}
      <div className={`h-[200px] w-full ${!selectedPoint ? 'md:col-span-2' : ''}`}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
            <XAxis dataKey="date" stroke="#888888" fontSize={12} tickLine={false} />
            <YAxis
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              domain={['dataMin - 1', 'dataMax + 1']}
            />
            <Line
              type="monotone"
              dataKey="average"
              stroke={color}
              strokeWidth={2}
              dot={renderCustomDot}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default MetricsSection;
