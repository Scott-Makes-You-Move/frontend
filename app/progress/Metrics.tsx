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

// Updated CustomDotProps to match Recharts expectations
interface CustomDotProps {
  cx: number;
  cy: number;
  index: number;
  stroke: string;
  dataKey?: string;
  payload?: DataPoint;
  value?: number;
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
      return <circle cx={0} cy={0} r={0} fill="none" />;
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
    <div className="border-2 border-red-500 grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
      <div className="border-2 border-blue-500 flex flex-col justify-around">
        <h2 className="text-2xl font-semibold text-gray-800">{title}</h2>

        {/* Current Metrics Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-8 ">
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
        <div className="animate-fade-in border-2 border-green-500 flex flex-col justify-around">
          <h3 className="text-xl font-bold text-gray-900">
            Historical ({selectedPoint.date})
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
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
      <div className="h-[200px] w-full border-2 border-purple-500">
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
