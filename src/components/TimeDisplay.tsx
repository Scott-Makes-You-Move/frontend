import React from "react";

interface TimeDisplayProps {
  nextBreak: string;
}

const TimeDisplay: React.FC<TimeDisplayProps> = ({ nextBreak }) => {
  return (
    <div className="mt-6 p-4 bg-accent text-primary font-body rounded-lg h-max">
      <p>
        Your next movement break is at{" "}
        <span className="font-bold">{nextBreak}</span>
      </p>
    </div>
  );
};

export default TimeDisplay;
