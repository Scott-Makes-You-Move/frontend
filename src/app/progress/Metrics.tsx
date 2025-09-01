'use client';

import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';
import { Button } from '@/components/ui/Button';

type DataPoint = {
  date: string;
  average: number;
  metrics: Record<string, number | string>;
};

type Metric = {
  key: string;
  label: string;
  suffix?: string;
};

interface MetricsSectionProps {
  title: string;
  data: DataPoint[];
  metrics: Metric[];
  color: string;
  onFallbackClick?: () => void;
}

interface CustomDotProps {
  cx?: number;
  cy?: number;
  index?: number;
}

const MetricsSection: React.FC<MetricsSectionProps> = ({
  title,
  data,
  metrics,
  color,
  onFallbackClick,
}) => {
  const [selectedPoint, setSelectedPoint] = useState<DataPoint | null>(null);

  const handleClick = (point: DataPoint) => {
    setSelectedPoint((prev) => (prev?.date === point.date ? null : point));
  };

  // Early return for empty state
  if (data.length === 0) {
    return (
      <div className="border border-border rounded-xl p-6 text-center space-y-4">
        <h3 className="text-xl font-title font-semibold text-foreground">
          No {title.toLowerCase()} data available
        </h3>
        <p className="text-muted-foreground text-sm">
          You haven't submitted any {title.toLowerCase()} entries yet.
        </p>
        {onFallbackClick && (
          <Button onClick={onFallbackClick} className="rounded-full px-6">
            Load Sample {title}
          </Button>
        )}
      </div>
    );
  }

  const currentMetrics = data[data.length - 1]?.metrics ?? {};

  const renderCustomDot = (props: CustomDotProps) => {
    const { cx, cy, index } = props;

    if (typeof cx !== 'number' || typeof cy !== 'number' || typeof index !== 'number') {
      return <circle cx={0} cy={0} r={0} fill="none" />;
    }

    const point = data[index];
    const isSelected = selectedPoint?.date === point.date;

    return (
      <circle
        key={`dot-${index}`}
        cx={cx}
        cy={cy}
        r={isSelected ? 10 : 8}
        fill={isSelected ? '#145da0' : color}
        className="cursor-pointer transition-colors duration-200"
        onClick={() => handleClick(point)}
      />
    );
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
      {/* Current Metrics */}
      <div
        className={`flex flex-col justify-around border-2 md:border-4 rounded-lg p-6 border-[${color}]`}
      >
        <h2 className="text-2xl font-title font-semibold text-foreground mb-4">{title}</h2>
        <div className="grid grid-cols-3 gap-6">
          {metrics.map(({ key, label, suffix }) => (
            <div key={key} className="space-y-1">
              <p className="text-lg font-bold text-foreground">
                {currentMetrics[key] ?? '—'}
                {suffix}
              </p>
              <p className="text-sm text-muted-foreground">{label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Historical View */}
      {selectedPoint && (
        <div className="relative animate-fade-in border-2 md:border-4 border-gray-500 rounded-lg p-6">
          <button
            onClick={() => setSelectedPoint(null)}
            className="absolute top-2 right-2 w-6 h-6 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
            aria-label="Close historical data"
          >
            <span className="text-gray-500 font-medium leading-none select-none" aria-hidden="true">
              ×
            </span>
          </button>

          <h3 className="text-xl font-title font-bold text-foreground mb-4">
            Historical ({selectedPoint.date})
          </h3>
          <div className="grid grid-cols-3 gap-6">
            {metrics.map(({ key, label, suffix }) => (
              <div key={key} className="space-y-1">
                <p className="text-lg font-bold text-foreground">
                  {selectedPoint.metrics[key] ?? '—'}
                  {suffix}
                </p>
                <p className="text-sm text-muted-foreground">{label}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Chart */}
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
              tickFormatter={(value) => value.toFixed(2)}
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
