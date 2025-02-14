"use client";
import React, { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

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
}

interface CustomDotProps {
  cx: number;
  cy: number;
  index: number;
  stroke: string;
  dataKey?: string;
  payload?: DataPoint;
}

const MetricsSection: React.FC<MetricsSectionProps> = ({
  title,
  data,
  metrics,
}) => {
  const [selectedPoint, setSelectedPoint] = useState<DataPoint | null>(null);

  const handleClick = (point: DataPoint) => {
    setSelectedPoint(point === selectedPoint ? null : point);
  };

  const currentMetrics = data[data.length - 1].metrics;

  const renderCustomDot = (props: CustomDotProps) => {
    const { cx, cy, index } = props;
    if (
      typeof cx !== "number" ||
      typeof cy !== "number" ||
      typeof index !== "number"
    ) {
      return null;
    }

    return (
      <circle
        key={`dot-${index}`}
        cx={cx}
        cy={cy}
        r={selectedPoint?.date === data[index]?.date ? 10 : 8}
        fill={selectedPoint?.date === data[index]?.date ? "#2563eb" : "#3b82f6"}
        className="cursor-pointer"
        onClick={() => data[index] && handleClick(data[index])}
      />
    );
  };

  return (
    <div className="space-y-6">
      {/* Section Title */}
      <h2 className="text-xl font-semibold text-gray-800">{title}</h2>

      {/* Current Metrics Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
        {metrics.map(({ key, label, suffix }) => (
          <div key={key} className="space-y-1">
            <p className="text-4xl font-bold text-gray-900">
              {currentMetrics[key]}
              {suffix}
            </p>
            <p className="text-sm text-gray-600">{label}</p>
          </div>
        ))}
      </div>

      {/* Selected Point Details */}
      {selectedPoint && (
        <div className="animate-fade-in mt-6">
          <h3 className="text-sm font-medium text-gray-600 mb-4">
            Historical Data - {selectedPoint.date}
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
            {metrics.map(({ key, label, suffix }) => (
              <div key={key} className="space-y-1">
                <p className="text-4xl font-bold text-gray-900">
                  {selectedPoint.metrics[key]}
                  {suffix}
                </p>
                <p className="text-sm text-gray-600">{label}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Progress Graph */}
      <div className="h-[200px] w-full mt-8">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
            <XAxis
              dataKey="date"
              stroke="#888888"
              fontSize={12}
              tickLine={false}
            />
            <YAxis
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              domain={["dataMin - 1", "dataMax + 1"]}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "white",
                border: "1px solid #e5e7eb",
                borderRadius: "6px",
                padding: "8px",
              }}
            />
            <Line
              type="monotone"
              dataKey="average"
              stroke="#3b82f6"
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
